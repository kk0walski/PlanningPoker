import React from "react";
import Profile from "../Profile/ProfileHeader";
import { Query } from "react-apollo";
import Loading from "../Loading";
import ErrorMessage from "../Error";

import { GET_ORGANISATION_PROFILE } from "./queries";

const ProfileOrgHeaderQuery = ({ organizationName }) => (
  <Query
    query={GET_ORGANISATION_PROFILE}
    variables={{
      organizationName
    }}
    skip={organizationName === ""}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      if (!data) {
        return <Loading isCenter={true} />;
      }
      console.log("DATA: ", data);
      const { organization } = data;

      if (loading && !organization) {
        return <Loading isCenter={true} />;
      }

      const profile = {
        login: organization.login,
        email: organization.email,
        avatarUrl: organization.avatarUrl
      };

      return (
        <Profile loading={loading} profile={profile} entry={"organization"} />
      );
    }}
  </Query>
);

export default ProfileOrgHeaderQuery;
