import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { getMongoConnection } from "./db";

const typeDefs = gql`
  type Query {
    now: Float!
  }
`;

const resolvers = {
  Query: {
    now: () => Date.now()
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async () => {
    const mongoClient = await getMongoConnection();
    return {
      mongoClient
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
