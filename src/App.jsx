import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Components/Home";
import BoardContainer from "./Components/BoardContainer";
import LandingPage from "./Components/LandingPage";
import Profile from "./Components/Profile";
import { justAddBoard, justRemoveBoard } from "./actions/Board";
import db from "./firebase/firebase";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

class App extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  componentDidUpdate(prevProps) {
    if (this.props.user) {
      if (
        (!prevProps.user && this.props.user) ||
        this.props.user.uid !== prevProps.user.uid
      ) {
        const { user } = this.props;
        if (this.boards) {
          this.boards();
        }
        this.boards = db
          .collection("boards")
          .where("users", "array-contains", user.uid.toString())
          .onSnapshot(querySnapchot => {
            querySnapchot.docChanges().forEach(change => {
              if (change.type === "added") {
                this.props.justAddBoard(change.doc.data());
              }
              if (change.type === "modified") {
                this.props.justAddBoard(change.doc.data());
              }
              if (change.type === "removed") {
                this.props.justRemoveBoard(change.doc.data().id);
              }
            });
          });
      }
    } else {
      if (this.boards) {
        this.boards();
      }
    }
  }

  componentWillUnmount() {
    this.boards();
  }

  render() {
    const { user } = this.props;
    if (user) {
      console.log("TOKEN: ", user.token);
      const GITHUB_BASE_URL = "https://api.github.com/graphql";
      const httpLink = new HttpLink({
        uri: GITHUB_BASE_URL,
        headers: {
          authorization: `Bearer ${user.token}`
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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/b/:boardId" component={BoardContainer} />
            <Route path="/profile" component={Profile} />
            <Redirect to="/" />
          </Switch>
        </ApolloProvider>
      );
    }

    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  justAddBoard: board => dispatch(justAddBoard(board)),
  justRemoveBoard: boardId => dispatch(justRemoveBoard(boardId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
