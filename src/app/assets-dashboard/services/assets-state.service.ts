import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { Asset } from '../../core/services/fintacharts-api/models/asset.interface';
import { FintachartsApiService } from '../../core/services/fintacharts-api/fintacharts-api.service';

@Injectable({
  providedIn: 'root',
})
export class AssetsStateService {
  private _fintachartsApi = inject(FintachartsApiService);

  private _selectedAsset$ = new BehaviorSubject<Asset | null>(null);
  public selectedAssetObservable = this._selectedAsset$.asObservable();

  getAssets(symbol: string) {
    return this._fintachartsApi.getAssets(symbol).pipe(map(res => res.data));
  }

  getCountBackBars(instrumentId: string) {
    return this._fintachartsApi.getCountBackBars(instrumentId).pipe(map(res => res.data));
  }

  updateSelectedAssetState(newAssetState: Asset | null) {
    this._selectedAsset$.next(newAssetState);
  }
}
