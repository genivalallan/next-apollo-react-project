import { DataSources, SearchArgs } from "./types";

const resolvers = {
  Query: {
    search: async (
      _: any,
      { keywords }: SearchArgs,
      { dataSources: { alphaVantageAPI } }: DataSources
    ) => alphaVantageAPI.search(keywords),
  },
};

export default resolvers;
