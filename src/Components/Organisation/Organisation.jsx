import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";
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
      <div style={{ width: "100%", height: "100%" }}>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
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
