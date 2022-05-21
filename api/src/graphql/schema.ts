import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    now: Float!
  }
`;

export default typeDefs;
