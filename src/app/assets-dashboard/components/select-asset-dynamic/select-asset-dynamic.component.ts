import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, finalize, ReplaySubject, switchMap, tap } from 'rxjs';

import { Asset } from '../../../core/services/fintacharts-api/models/asset.interface';
import { AssetsStateService } from '../../services/assets-state.service';

@Component({
  selector: 'app-select-asset-dynamic',
  standalone: true,
  imports: [NgxMatSelectSearchModule, MatSelect, MatOption, MatFormField, ReactiveFormsModule, NgForOf, AsyncPipe],
  templateUrl: './select-asset-dynamic.component.html',
  styleUrl: './select-asset-dynamic.component.scss',
})
export class SelectAssetDynamicComponent implements OnInit {
  private _assetsState = inject(AssetsStateService);
  private _destroyRef = inject(DestroyRef);

  assetCtrl = new FormControl<Asset | null>(null);
  assetFilteringCtrl = new FormControl<string>('');

  isSearching = false;

  filteredAssets = new ReplaySubject<Asset[]>(1);

  ngOnInit() {
    this.assetFilteringCtrl.valueChanges
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter((searchValue): searchValue is string => searchValue !== null),
        tap(() => (this.isSearching = true)),
        debounceTime(200),
        switchMap(searchValue =>
          this._assetsState.getAssets(searchValue).pipe(finalize(() => (this.isSearching = false)))
        )
      )
      .subscribe((loadedAssets: Asset[]) => {
        this.filteredAssets.next(loadedAssets);
      });

    this.assetCtrl.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(value => this._assetsState.updateSelectedAssetState(value));
  }
}
