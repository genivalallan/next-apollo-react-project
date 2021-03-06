import { MongoClient } from "mongodb";
import AlphaVantageAPI from "../providers/alphaVantage/alphaVantageRESTAPI";

export interface DataSources {
  dataSources: {
    alphaVantageAPI: AlphaVantageAPI;
  };
  mongoClient: MongoClient;
}

export interface SearchArgs {
  keyword: string;
}

export interface AddAssetArgs {
  newAsset: AssetInput;
}

export interface AssetInput {
  symbol: string;
  name: string;
  region: string;
}

export interface Asset {
  tickerSymbol: string;
  tickerRegion: string;
  numberOfShares: number;
  createdAt: Date;
  lastUpdatedAt: Date | null;
}

export interface UpdateShareArgs {
  assetUpdate: UpdateShareInput;
}

export interface UpdateShareInput {
  tickerSymbol: string;
  shares: number;
}

export interface RemoveAssetArgs {
  tickerSymbol: string;
}

export interface AssetArgs {
  tickerSymbol: string;
}
