import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";
import SearchForm from "./OrganisationSearch";
import { GithubContent } from "./GithubContent";
import { Route, Switch } from "react-router-dom";
export default class Organisation extends Component {
  render() {
    const { match } = this.props;
    console.log("MATCH: ", match);
    return (
      <div style={{ width: "100%" }}>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
        <div id="content" style={{ marginTop: "60px" }}>
          <div className="container">
            <SearchForm match={match} />
            <div className="row">
              <Switch>
                <Route
                  path={`${match.path}/:search`}
                  component={GithubContent}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
