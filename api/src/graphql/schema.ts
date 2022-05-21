import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    search(keyword: String!): [Match!]!
  }

  type Match {
    symbol: String!
    name: String!
    region: String!
  }
`;

export default typeDefs;
