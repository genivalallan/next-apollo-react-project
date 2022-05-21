import { DataSources, SearchArgs } from "./types";

const resolvers = {
  Query: {
    search: async (
      _: any,
      { keyword }: SearchArgs,
      { dataSources: { alphaVantageAPI } }: DataSources
    ) => alphaVantageAPI.search(keyword),
  },
};

export default resolvers;
