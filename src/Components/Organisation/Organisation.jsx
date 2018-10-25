import React, { Component } from "react";
import Navigation from "./Navigation";
import OrganisationQuery from "./OrganisationQuery";
import ProfileOrgQuery from "./ProfileOrgHeaderQuery";
import classnames from "classnames";

export default class Organisation extends Component {
  state = {
    organizationName: "django"
  };

  onOrganizationSearch = value => {
    this.setState({ organizationName: value });
  };

  render() {
    const { organizationName } = this.state;
    const { match } = this.props;

    return (
      <div>
        <Navigation
          organizationName={organizationName}
          onOrganizationSearch={this.onOrganizationSearch}
        />
        <div id="content">
          <ProfileOrgQuery organizationName={organizationName} />
        </div>
        <div className={classnames("tabbed-pane-nav", "u-clearfix")}>
          <ul>
            <li className="tabbed-pane-nav-item">
              <p
                className={classnames("tabbed-pane-nav-item-button", "active")}
              >
                Repositories
              </p>
            </li>
          </ul>
        </div>
        <div className="main-content" style={{ margin: "40px 0" }}>
          <OrganisationQuery
            organizationName={organizationName}
            match={match}
          />
        </div>
      </div>
    );
  }
}
