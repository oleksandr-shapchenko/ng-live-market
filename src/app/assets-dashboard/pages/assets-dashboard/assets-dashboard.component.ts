import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Observable, of, switchMap } from 'rxjs';

import { AssetLiveDataComponent } from '../../components/asset-live-data/asset-live-data.component';
import { AssetChartComponent } from '../../components/asset-chart/asset-chart.component';
import { AssetsStateService } from '../../services/assets-state.service';
import { SelectAssetDynamicComponent } from '../../components/select-asset-dynamic/select-asset-dynamic.component';
import { CountBackBar } from '../../../core/services/fintacharts-api/models/count-back-bar.interface';

@Component({
  selector: 'app-assets-dashboard',
  standalone: true,
  imports: [AssetLiveDataComponent, AssetChartComponent, SelectAssetDynamicComponent, MatButton, AsyncPipe],
  templateUrl: './assets-dashboard.component.html',
  styleUrl: './assets-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssetsDashboardComponent {
  private _assetsState = inject(AssetsStateService);

  countBackBars$: Observable<CountBackBar[]> = this._assetsState.selectedAssetObservable.pipe(
    switchMap(selectedAsset => {
      if (!selectedAsset) {
        return of([]);
      }

      return this._assetsState.getCountBackBars(selectedAsset.id);
    })
  );
}
