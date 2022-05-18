import { ObjectId } from "mongodb";

export type AssetPortfolioPosition = {
  _id: ObjectId;
  tickerSymbol: string;
  numberOfShares: number;
  createdAt: Date;
  lastUpdatedAt: Date | null;
};
