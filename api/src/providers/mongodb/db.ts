import { Db, MongoClient } from "mongodb";
import type { AssetPortfolioPosition } from "./assetPortfolioPosition";

export async function getMongoConnection() {
  const dbHost = process.env.DB_HOST ?? "localhost";
  const dbPort = process.env.DB_PORT ?? "27017";
  const client = new MongoClient(`mongodb://${dbHost}:${dbPort}`);
  return client.connect();
}

export function useCollections(db: Db) {
  return {
    assetPortfolioPositions: db.collection<AssetPortfolioPosition>("assetportfoliopositions")
  };
}
