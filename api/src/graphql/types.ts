import { MongoClient } from "mongodb";
import AlphaVantageAPI from "../providers/alphaVantage/alphaVantageRESTAPI";

export interface DataSources {
  dataSources: {
    alphaVantageAPI: AlphaVantageAPI;
  };
  mongoClient: MongoClient;
}

export interface SearchArgs {
  keywords: string;
}
