import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    search(keyword: String!): [Match!]!
  }

  type Mutation {
    addAsset(newAsset: AssetInput!): Asset!
  }

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
`;

export default typeDefs;
