import React, { Component } from "react";
import { AppNavigation } from "./AppNavigation";
import { Route, Switch } from "react-router-dom";

import { AppContainer, Navigation, Body, Title } from "./containers";

import { Home } from "./Home";
import { Basic } from "./Basic";
import { RenderItems } from "./RenderItems";
import { RenderItems2 } from "./RenderItems2";

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
            <Route path={`${match.path}/basic`} component={Basic} />
            <Route path={`${match.path}/renderitems`} component={RenderItems} />
            <Route
              path={`${match.path}/renderitems2`}
              component={RenderItems2}
            />
            <Route path={`${match.path}/home`} component={Home} />
            <Route path={match.path} component={Home} />
          </Switch>
        </Body>
      </AppContainer>
    );
  }
}
