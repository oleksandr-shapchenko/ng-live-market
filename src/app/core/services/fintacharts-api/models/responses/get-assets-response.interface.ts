import { Asset } from '../asset.interface';

interface Paging {
  page: number;
  pages: number;
  items: number;
}

export interface GetAssetsResponse {
  paging: Paging;
  data: Asset[];
}
