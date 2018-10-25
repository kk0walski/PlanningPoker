import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import Organisation from "./Organisation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrganisationIssues from "./organisationIssues";
import { Helmet } from "react-helmet";
import Header from "../Header";

export default class OrganisationContainer extends Component {
  render() {
    const { match } = this.props;
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
        <div style={{ width: "100%", height: "100%" }}>
          <Helmet>
            <title>Home | Team Estimation Game</title>
          </Helmet>
          <Header />
          <Router>
            <Switch>
              <Route exact path={match.path} component={Organisation} />
              <Route
                path={`${match.path}/:organisation`}
                component={OrganisationIssues}
              />
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}
