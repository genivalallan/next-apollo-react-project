import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server-core";
import { URLSearchParamsInit } from "apollo-server-env";
import { Match, MatchResponse, SearchResponse } from "./types";

export default class AlphaVantageAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = "https://www.alphavantage.co/query";
  }

  async search(keyword: string): Promise<Match[]> {
    if (!keyword.trim()) return [];

    let response: SearchResponse;
    try {
      response = await this.get<SearchResponse>(
        "",
        this.queryParams(keyword.trim())
      );
    } catch (error) {
      throw new ApolloError("An error ocurred when fetching data");
    }

    return response.bestMatches.length > 0
      ? response.bestMatches.map((match) => this.matchReducer(match))
      : [];
  }

  queryParams(keyword: string): URLSearchParamsInit {
    return {
      function: "SYMBOL_SEARCH",
      keywords: keyword,
      apikey: process.env.ALPHA_VANTAGE_APIKEY,
    };
  }

  matchReducer(match: MatchResponse): Match {
    return {
      symbol: match["1. symbol"],
      name: match["2. name"],
      region: match["4. region"],
    };
  }
}
