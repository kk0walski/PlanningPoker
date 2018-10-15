import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Components/Home";
import BoardContainer from "./Components/BoardContainer";
import LandingPage from "./Components/LandingPage";
import Profile from "./Components/Profile";

class App extends Component {
  static propTypes = {
    user: PropTypes.object
  };

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

export default withRouter(connect(mapStateToProps)(App));
