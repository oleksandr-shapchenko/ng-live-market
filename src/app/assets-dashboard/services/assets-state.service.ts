import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';

import { Asset } from '../../core/services/fintacharts-api/models/asset.interface';
import { FintachartsApiService } from '../../core/services/fintacharts-api/fintacharts-api.service';
import { FintachartsWsService } from '../../core/services/fintacharts-ws/fintacharts-ws.service';
import { AssetWsResponseTypeEnum } from '../../core/services/fintacharts-ws/models/asset-ws-response-type.enum';
import { AssetWsLastUpdateResponse } from '../../core/services/fintacharts-ws/models/asset-ws-response.interface';

@Injectable({
  providedIn: 'root',
  deps: [FintachartsWsService, FintachartsApiService],
})
export class AssetsStateService {
  private _fintachartsApi = inject(FintachartsApiService);
  private _fintachartsWs = inject(FintachartsWsService);

  private _selectedAsset$ = new BehaviorSubject<Asset | null>(null);
  public selectedAssetObservable$ = this._selectedAsset$.asObservable();

  private _selectedAssetWsStream$ = this._fintachartsWs.messageEventSubject$.pipe(
    filter(m => !!m),
    map(m => JSON.parse(m.data))
  );
  public selectedAssetLiveDataObservable$ = this._selectedAssetWsStream$.pipe(
    filter((data): data is AssetWsLastUpdateResponse => data.type === AssetWsResponseTypeEnum.UPDATE),
    map(data => data.last)
  );

  subscribeToLiveData(assetId: string) {
    this._fintachartsWs.subscribe(assetId);
  }

  unsubscribeToLiveData(assetId: string) {
    this._fintachartsWs.unsubscribe(assetId);
  }

  closeSocket() {
    this._fintachartsWs.closeSocket();
  }

  getAssets(symbol: string) {
    return this._fintachartsApi.getAssets(symbol).pipe(map(res => res.data));
  }

  getCountBackBars(assetId: string) {
    return this._fintachartsApi.getCountBackBars(assetId).pipe(map(res => res.data));
  }

  updateSelectedAssetState(newAssetState: Asset | null) {
    this._selectedAsset$.next(newAssetState);
  }
}
