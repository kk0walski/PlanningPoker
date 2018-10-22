import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./ProfileHeader";
import { Query } from "react-apollo";
import Loading from "../Loading";
import ErrorMessage from "../Error";

import { GET_USER_PROFILE } from "./queries";

export default class ProfileHeaderQuery extends Component {
  render() {
    return (
      <Query query={GET_USER_PROFILE} notifyOnNetworkStatusChange={true}>
        {({ data, loading, error }) => {
          const { viewer } = data;

          if (loading && !viewer) {
            return <Loading isCenter={true} />;
          }

          if (error) {
            return <ErrorMessage error={error} />;
          }

          console.log("VIEWER: ", viewer);

          const profile = {
            login: viewer.login,
            email: viewer.email,
            avatarUrl: viewer.avatarUrl,
            bio: viewer.bio,
            company: viewer.company,
            companyHTML: viewer.companyHTML
          };

          return (
            <Profile loading={loading} profile={profile} entry={"viewer"} />
          );
        }}
      </Query>
    );
  }
}
