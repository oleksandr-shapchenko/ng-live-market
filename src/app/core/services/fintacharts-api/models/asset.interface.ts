interface Mapping {
  symbol: string;
  exchange: string;
  defaultOrderSize: number;
}

type Mappings = Record<string, Mapping>;

interface Profile {
  name: string;
  gics: Record<string, any>;
}

export interface Asset {
  id: string;
  symbol: string;
  kind: string;
  description: string;
  tickSize: number;
  currency: string;
  baseCurrency: string;
  mappings: Mappings;
  profile: Profile;
}
