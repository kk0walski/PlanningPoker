import React, { Component } from "react";
import Navigation from "./Navigation";
import OrganisationQuery from "./OrganisationQuery";

export default class Organisation extends Component {
  state = {
    organizationName: "django"
  };

  onOrganizationSearch = value => {
    this.setState({ organizationName: value });
  };

  render() {
    const { organizationName } = this.state;

    return (
      <div>
        <Navigation
          organizationName={organizationName}
          onOrganizationSearch={this.onOrganizationSearch}
        />
        <div className="home">
          <div className="main-content" style={{ margin: "40px 0" }}>
            <OrganisationQuery organizationName={organizationName} />
          </div>
        </div>
      </div>
    );
  }
}
