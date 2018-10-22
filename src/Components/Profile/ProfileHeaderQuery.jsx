import React, { Component } from "react";
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
          if (error) {
            return <ErrorMessage error={error} />;
          }

          if (!data) {
            return <Loading isCenter={true} />;
          }
          const { viewer } = data;

          if (loading && !viewer) {
            return <Loading isCenter={true} />;
          }

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
