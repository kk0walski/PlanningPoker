import React, { Component } from "react";
import { AppNavigation } from "./AppNavigation";
import { Route, Switch, Redirect } from "react-router-dom";

import { AppContainer, Navigation, Body, Title } from "./containers";

import Home from "./Home";
import Basic from "./Basic";

export class GithubContent extends Component {
  render() {
    const { match } = this.props;
    return (
      <AppContainer>
        <Navigation>
          <Title> React SideNav </Title>
          <AppNavigation match={match} />
        </Navigation>
        <Body>
          <Switch>
            <Route exact path={match.path} component={Home} />
            <Route path={`${match.path}/basic`} component={Basic} />
            <Redirect to={match.path} />
          </Switch>
        </Body>
      </AppContainer>
    );
  }
}
