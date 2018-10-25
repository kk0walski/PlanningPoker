import Issues from "./IssueList";
import React, { Component } from "react";
import classnames from "classnames";
import IssuesHeader from "./Header";

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
              <p
                className={classnames("tabbed-pane-nav-item-button", "active")}
              >
                Issues
              </p>
            </li>
          </ul>
        </div>
        <div className="repositories">
          <Issues
            repositoryOwner={match.params.organisation}
            repositoryName={match.params.repository}
          />
        </div>
      </div>
    );
  }
}
