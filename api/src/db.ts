import { MongoClient } from "mongodb";

export async function getMongoConnection() {
  const client = new MongoClient("mongodb://localhost:27017");
  return client.connect();
}
