import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Components/Home";
import BoardContainer from "./Components/BoardContainer";
import LandingPage from "./Components/LandingPage";
import Profile from "./Components/Profile";
import { justAddBoard, justRemoveBoard } from "./actions/Board";
import Organisation from "./Components/Organisation";
import db from "./firebase/firebase";
import OrganisationIssues from "./Components/Issues";
import User from "./Components/User";

class App extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.boards = function() {
      console.log("Przykładowa funkcja");
    };
  }

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
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/b/:boardId" component={BoardContainer} />
          <Route path="/profile" component={Profile} />
          <Route path="/organisation" component={Organisation} />
          <Route
            path="/repository/:owner/:name"
            component={OrganisationIssues}
          />
          <Route path="/user/:login" component={User} />
          <Redirect to="/" />
        </Switch>
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
