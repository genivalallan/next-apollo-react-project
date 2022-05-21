import { ObjectId } from "mongodb";

export type AssetPortfolioPosition = {
  _id: ObjectId;
  tickerSymbol: string;
  tickerName: String;
  tickerRegion: String;
  numberOfShares: number;
  createdAt: Date;
  lastUpdatedAt: Date | null;
};
