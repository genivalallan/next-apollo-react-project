import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo, { WithApolloProps } from "next-with-apollo";
import type { AppProps } from "next/app";

function App({ Component, pageProps, apollo }: AppProps & WithApolloProps<typeof InMemoryCache>) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: "http://localhost:4000",
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  { getDataFromTree: getDataFromTree }
)(App);
