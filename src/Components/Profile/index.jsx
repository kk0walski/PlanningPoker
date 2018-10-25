import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import Profile from "./Profile";
import { Helmet } from "react-helmet";
import Header from "../Header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProfileContainer extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const { user, match } = this.props;
    if (user && user.token) {
      const GITHUB_BASE_URL = "https://api.github.com/graphql";
      const httpLink = new HttpLink({
        uri: GITHUB_BASE_URL
      });

      const authLink = setContext((_, { headers }) => {
        const token = user.token;

        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
          }
        };
      });

      const errorLink = onError(
        ({ graphQLErrors, networkError, operation, forward }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message, extensions, locations, path }) => {
              if (extensions) {
                switch (extensions.code) {
                  case "UNAUTHENTICATED":
                    // old token has expired throwing AuthenticationError,
                    // one way to handle is to obtain a new token and
                    // add it to the operation context
                    const headers = operation.getContext().headers;
                    operation.setContext({
                      headers: {
                        ...headers,
                        authorization: user.token
                      }
                    });
                    // Now, pass the modified operation to the next link
                    // in the chain. This effectively intercepts the old
                    // failed request, and retries it with a new token
                    return forward(operation);
                  default:
                    console.log(
                      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    );
                    return new Error(
                      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    );
                }
              } else {
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                );
                return new Error(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                );
              }
            });
          }

          if (networkError) {
            console.log(`[Network error]: ${networkError}`);
          }
        }
      );

      const gitLink = authLink.concat(httpLink);

      const link = ApolloLink.from([errorLink, gitLink]);

      const cache = new InMemoryCache();

      const client = new ApolloClient({
        link,
        cache
      });
      return (
        <ApolloProvider client={client}>
          <Router>
            <div style={{ width: "100%", height: "100%" }}>
              <Helmet>
                <title>Home | Team Estimation Game</title>
              </Helmet>
              <Header />
              <Route exact path={match.path} component={Profile} />
            </div>
          </Router>
        </ApolloProvider>
      );
    } else {
      return <p>No access token or user</p>;
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(ProfileContainer);
