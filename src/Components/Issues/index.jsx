import openIssues from "./OpenIssueList";
import closedIssues from "./ClosedIssueList";
import React, { Component } from "react";
import classnames from "classnames";
import IssuesHeader from "./Header";
import { Route, Switch, Link } from "react-router-dom";
import Header from "../Header";
import { Helmet } from "react-helmet";

export default class OrganisationIssues extends Component {
  render() {
    const { match } = this.props;
    console.log("MATCH: ", match);
    return (
      <div style={{ width: "100%" }}>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
        <div id="content">
          <IssuesHeader owner={match.params.owner} name={match.params.name} />
        </div>
        <div className={classnames("tabbed-pane-nav", "u-clearfix")}>
          <ul>
            <li className="tabbed-pane-nav-item">
              <Link
                to={`${match.url}`}
                className={classnames("tabbed-pane-nav-item-button")}
              >
                Open
              </Link>
            </li>
            <li className="tabbed-pane-nav-item">
              <Link
                to={`${match.url}/closed`}
                className={classnames("tabbed-pane-nav-item-button")}
              >
                Closed
              </Link>
            </li>
          </ul>
        </div>
        <div className="repositories">
          <Switch>
            <Route
              exact
              path="/repository/:owner/:project"
              component={openIssues}
            />
            <Route
              path="/repository/:owner/:project/closed"
              component={closedIssues}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
