import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import Organisation from "./Organisation";

export default class OrganisationContainer extends Component {
  render() {
    const GITHUB_BASE_URL = "https://api.github.com/graphql";

    const httpLink = new HttpLink({
      uri: GITHUB_BASE_URL,
      headers: {
        authorization: `Bearer ${
          process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
        }`
      }
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    const link = ApolloLink.from([errorLink, httpLink]);

    const cache = new InMemoryCache();

    const client = new ApolloClient({
      link,
      cache
    });
    return (
      <ApolloProvider client={client}>
        <Organisation />
      </ApolloProvider>
    );
  }
}
