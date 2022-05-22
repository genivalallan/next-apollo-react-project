import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    search(keyword: String!): [Match!]!
    assets: [Asset!]!
    asset(tickerSymbol: String!): Asset
  }

  type Mutation {
    addAsset(newAsset: AssetInput!): Asset!
    addAssets(matches: [AssetInput!]!): String!
    updateShare(assetUpdate: UpdateShareInput!): Asset
    removeAsset(tickerSymbol: String!): Asset
  }

  scalar Date

  type Match {
    symbol: String!
    name: String!
    region: String!
  }

  type Asset {
    tickerSymbol: String!
    tickerName: String!
    tickerRegion: String!
    numberOfShares: Int!
    createdAt: Date!
    lastUpdatedAt: Date
  }

  input AssetInput {
    symbol: String!
    name: String!
    region: String!
  }

  input UpdateShareInput {
    tickerSymbol: String!
    shares: Int!
  }
`;

export default typeDefs;
