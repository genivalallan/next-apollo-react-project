import { ApolloError } from "apollo-server-core";
import { GraphQLScalarType, Kind } from "graphql";
import { DeleteResult, ObjectId, UpdateResult, WithId } from "mongodb";
import { AssetPortfolioPosition } from "../providers/mongodb/assetPortfolioPosition";
import { useCollections } from "../providers/mongodb/db";
import {
  AddAssetArgs,
  Asset,
  AssetInput,
  DataSources,
  RemoveAssetArgs,
  SearchArgs,
  UpdateShareArgs,
  UpdateShareInput,
} from "./types";

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

const validateAssetInput = (asset: AssetInput): AssetInput | null => {
  const sanitizedInput: AssetInput = {
    symbol: asset.symbol.trim().toUpperCase(),
    name: asset.name.trim().toUpperCase(),
    region: asset.region.trim(),
  };

  if (!(sanitizedInput.name && sanitizedInput.symbol && sanitizedInput.region))
    return null;
  else return sanitizedInput;
};

const validateUpdateShareInput = (
  updateShareInput: UpdateShareInput
): UpdateShareInput | null => {
  const sanitizedInput: UpdateShareInput = {
    tickerSymbol: updateShareInput.tickerSymbol.trim().toUpperCase(),
    shares: updateShareInput.shares,
  };

  if (
    !(
      sanitizedInput.tickerSymbol &&
      0 < sanitizedInput.shares &&
      sanitizedInput.shares < 101
    )
  )
    return null;
  else return sanitizedInput;
};

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

      const sanitizedAsset = validateAssetInput(newAsset);

      if (!sanitizedAsset)
        throw new ApolloError("The input received is invalid", "BAD_INPUT");

      if (
        !(
          sanitizedAsset.region.toUpperCase().includes("BRAZIL") &&
          sanitizedAsset.region.toUpperCase().includes("UNITED STATES")
        )
      ) {
        throw new ApolloError("Invalid region.", "BAD_INPUT");
      }

      try {
        response = await collection.findOne({
          tickerSymbol: sanitizedAsset.symbol,
        });
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
            tickerSymbol: sanitizedAsset.symbol,
            tickerName: sanitizedAsset.name,
            tickerRegion: sanitizedAsset.region,
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
        tickerSymbol: sanitizedAsset.symbol,
      });

      if (!savedAsset)
        throw new ApolloError(
          "Could not retrieve data from database.",
          "DATABASE_ERROR"
        );

      return savedAsset;
    },

    updateShare: async (
      _: any,
      { assetUpdate }: UpdateShareArgs,
      { mongoClient }: DataSources
    ) => {
      const sanitizedShareInput = validateUpdateShareInput(assetUpdate);

      if (!sanitizedShareInput)
        throw new ApolloError("The input received is invalid", "BAD_INPUT");

      const collection = useCollections(
        mongoClient.db()
      ).assetPortfolioPositions;

      let response: UpdateResult;
      try {
        response = await collection.updateOne(
          { tickerSymbol: sanitizedShareInput.tickerSymbol },
          {
            $set: {
              numberOfShares: sanitizedShareInput.shares,
              lastUpdatedAt: new Date(),
            },
          }
        );
      } catch (error) {
        throw new ApolloError("Error during update operation.");
      }

      const updatedAsset = await collection.findOne({
        tickerSymbol: sanitizedShareInput.tickerSymbol,
      });

      if (!updatedAsset) throw new ApolloError("Error during find Operation.");

      return updatedAsset;
    },

    removeAsset: async (
      _: any,
      { tickerSymbol: symbolInput }: RemoveAssetArgs,
      { mongoClient }: DataSources
    ) => {
      const tickerSymbol = symbolInput.trim().toUpperCase();

      if (!tickerSymbol)
        throw new ApolloError("The input received is invalid", "BAD_INPUT");

      const collection = useCollections(
        mongoClient.db()
      ).assetPortfolioPositions;

      let asset: WithId<AssetPortfolioPosition> | null;
      try {
        asset = await collection.findOne({
          tickerSymbol,
        });
      } catch (error) {
        throw new ApolloError(
          "Could not search for the document in the database",
          "DATABASE_ERROR"
        );
      }

      if (!asset) return null;

      try {
        await collection.deleteOne({
          tickerSymbol,
        });
      } catch (error) {
        throw new ApolloError(
          "Could not delete the document in the database",
          "DATABASE_ERROR"
        );
      }

      return asset;
    },
  },
};

export default resolvers;
