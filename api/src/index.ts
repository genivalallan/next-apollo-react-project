import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { getMongoConnection } from "./providers/mongodb/db";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

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
