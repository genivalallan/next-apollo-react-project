export interface Asset {
  tickerSymbol: string;
  tickerName: string;
  tickerRegion: string;
  numberOfShares: number;
  createdAt: Date;
  lastUpdatedAt: Date | null;
}

export interface Match {
  symbol: string;
  name: string;
  region: string;
}

export interface AssetInput {
  symbol: string;
  name: string;
  region: string;
}

export interface AssetUpdate {
  tickerSymbol: string;
  shares: number;
}

export interface SearchArgs {
  keywords: string;
}

export interface AddAssetArgs {
  newAsset: AssetInput;
}

export interface RemoveAssetArgs {
  tickerSymbol: string;
}

export interface UpdateShareArgs {
  assetUpdate: AssetUpdate;
}
