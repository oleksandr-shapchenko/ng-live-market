export interface AssetLiveData {
  timestamp: string;
  price: number;
  volume: number;
  change?: number;
  changePct?: number;
}
