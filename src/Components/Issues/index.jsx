import openIssues from "./OpenIssueList";
import closedIssues from "./ClosedIssueList";
import React, { Component } from "react";
import classnames from "classnames";
import IssuesHeader from "./Header";
import { Route, Switch, Link } from "react-router-dom";

export default class OrganisationIssues extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <div id="content">
          <IssuesHeader
            repositoryOwner={match.params.organisation}
            repositoryName={match.params.repository}
          />
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
              path="/organisation/:owner/:project"
              component={openIssues}
            />
            <Route
              path="/organisation/:owner/:project/closed"
              component={closedIssues}
            />
          </Switch>
        </div>
        {/* 
        <div className="repositories">
          <Issues
            repositoryOwner={match.params.organisation}
            repositoryName={match.params.repository}
          />
        </div> */}
      </div>
    );
  }
}
