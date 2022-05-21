import { ApolloError } from "apollo-server-core";
import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";
import { useCollections } from "../providers/mongodb/db";
import { AddAssetArgs, Asset, DataSources, SearchArgs } from "./types";

const dateScalar = new GraphQLScalarType<Date | null, number>({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return (value as Date).getTime(); // Convert outgoing Date to integer for JSON
  },

  parseValue(value) {
    return new Date(value as number); // Convert incoming integer to Date
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }

    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    search: async (
      _: any,
      { keyword }: SearchArgs,
      { dataSources: { alphaVantageAPI } }: DataSources
    ) => alphaVantageAPI.search(keyword),
  },

  Mutation: {
    addAsset: async (
      _: any,
      { newAsset }: AddAssetArgs,
      { mongoClient }: DataSources
    ): Promise<Asset> => {
      const collection = useCollections(
        mongoClient.db()
      ).assetPortfolioPositions;
      let response;

      try {
        response = await collection.findOne({ tickerSymbol: newAsset.symbol });
      } catch (error) {
        throw new ApolloError("Error during Asset creation.", "DATABASE_ERROR");
      }

      if (response) {
        try {
          response = await collection.updateOne(
            { _id: response._id },
            {
              $set: {
                numberOfShares: response.numberOfShares + 1,
                lastUpdatedAt: new Date(),
              },
            }
          );
        } catch (error) {
          throw new ApolloError(
            "Error during Asset creation.",
            "DATABASE_ERROR"
          );
        }
      } else {
        try {
          response = await collection.insertOne({
            _id: new ObjectId(),
            tickerSymbol: newAsset.symbol,
            tickerName: newAsset.name,
            tickerRegion: newAsset.region,
            numberOfShares: 1,
            createdAt: new Date(),
            lastUpdatedAt: null,
          });
        } catch (error) {
          throw new ApolloError(
            "Error during Asset creation.",
            "DATABASE_ERROR"
          );
        }
      }

      const savedAsset = await collection.findOne({
        tickerSymbol: newAsset.symbol,
      });

      if (!savedAsset)
        throw new ApolloError(
          "Could not retrieve data from database.",
          "DATABASE_ERROR"
        );

      return savedAsset;
    },
  },
};

export default resolvers;
