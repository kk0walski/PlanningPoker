import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";
import SearchForm from "./OrganisationSearch";
import { Route, Switch, Redirect } from "react-router-dom";
import { GithubContent } from "./GithubContent";
import PropTypes from "prop-types";
export default class Organisation extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.startSearch = this.startSearch.bind(this);
    this.state = {
      newSearch: undefined
    };
  }

  startSearch(text) {
    const { match } = this.props;
    this.setState({
      newSearch: text
    });
    this.context.router.history.push(`${match.path}/${text}`);
  }

  render() {
    const { match } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
        <div style={{ marginTop: "60px" }}>
          <div className="container">
            <SearchForm startSearch={this.startSearch} match={match} />
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
