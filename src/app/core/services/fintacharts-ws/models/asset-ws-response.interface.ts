import { AssetLiveData } from './asset-live-data.interface';
import { AssetWsResponseTypeEnum } from './asset-ws-response-type.enum';

interface AssetWsResponse {
  type: AssetWsResponseTypeEnum;
}

interface AssetWsUpdateResponse extends AssetWsResponse {
  instrumentId: string;
  provider: string;
}

export interface AssetWsLastUpdateResponse extends AssetWsUpdateResponse {
  last: AssetLiveData;
}
