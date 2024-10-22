import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge, Observable, of, Subject } from 'rxjs';

import { AssetLiveDataComponent } from '../../components/asset-live-data/asset-live-data.component';
import { AssetChartComponent } from '../../components/asset-chart/asset-chart.component';
import { AssetsStateService } from '../../services/assets-state.service';
import { SelectAssetDynamicComponent } from '../../components/select-asset-dynamic/select-asset-dynamic.component';
import { CountBackBar } from '../../../core/services/fintacharts-api/models/count-back-bar.interface';
import { Asset } from '../../../core/services/fintacharts-api/models/asset.interface';
import { AssetLiveData } from '../../../core/services/fintacharts-ws/models/asset-live-data.interface';

@Component({
  selector: 'app-assets-dashboard',
  standalone: true,
  imports: [AssetLiveDataComponent, AssetChartComponent, SelectAssetDynamicComponent, MatButton, AsyncPipe],
  templateUrl: './assets-dashboard.component.html',
  styleUrl: './assets-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssetsDashboardComponent implements OnInit, OnDestroy {
  private _assetsState = inject(AssetsStateService);
  private _destroyRef = inject(DestroyRef);

  selectedAsset: Asset | null = null;
  countBackBars$: Observable<CountBackBar[]> = of([]);
  resetAssetLiveData$ = new Subject<null>();
  assetLiveData$: Observable<AssetLiveData | null> = merge(
    this.resetAssetLiveData$,
    this._assetsState.selectedAssetLiveDataObservable$
  );

  ngOnInit() {
    this._assetsState.selectedAssetObservable$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(selectedAsset => {
      if (this.selectedAsset) {
        this.resetAssetLiveData$.next(null);
        this._assetsState.unsubscribeToLiveData(this.selectedAsset.id);
      }

      this.selectedAsset = selectedAsset;

      this.countBackBars$ = selectedAsset ? this._assetsState.getCountBackBars(this.selectedAsset!.id) : of([]);
    });
  }

  ngOnDestroy() {
    this._assetsState.closeSocket();
  }

  subscribeToLiveData(assetId: string) {
    this._assetsState.subscribeToLiveData(assetId);
  }
}
