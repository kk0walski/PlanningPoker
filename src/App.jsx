import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Components/Home";
import BoardContainer from "./Components/BoardContainer";
import LandingPage from "./Components/LandingPage";
import Profile from "./Components/Profile";
import db from "../firebase/firebase";
import { justAddBoard, justRemoveBoard } from "./actions/Board";

class App extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.boards = db
        .collection("boards")
        .where("users", "array-contains", user.uid)
        .onSnapshot(querySnapchot => {
          querySnapchot.docChanges.forEach(change => {
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