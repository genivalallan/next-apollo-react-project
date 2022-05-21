import { Db, MongoClient } from "mongodb";
import type { AssetPortfolioPosition } from "./assetPortfolioPosition";

export async function getMongoConnection() {
  const client = new MongoClient("mongodb://localhost:27017");
  return client.connect();
}

export function useCollections(db: Db) {
  return {
    assetPortfolioPositions: db.collection<AssetPortfolioPosition>("assetportfoliopositions")
  };
}
