import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo, { WithApolloProps } from "next-with-apollo";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { Theme, themes } from "../styles/themes";
import "../styles/globals.css";

export const ThemeContext = React.createContext<Theme>({
  darkMode: false,
  theme: themes.light,
  toggleTheme: () => {},
});

function App({
  Component,
  pageProps,
  apollo,
}: AppProps & WithApolloProps<typeof InMemoryCache>) {
  const [isDark, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!isDark);
  }

  return (
    <ApolloProvider client={apollo}>
      <ThemeContext.Provider
        value={{
          darkMode: isDark,
          theme: isDark ? themes.dark : themes.light,
          toggleTheme,
        }}
      >
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </ApolloProvider>
  );
}

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: "http://localhost:4000",
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  { getDataFromTree: getDataFromTree }
)(App);
