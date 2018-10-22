import React from "react";
import { Query } from "react-apollo";

import { GET_REPOSITORIES_OF_CURRENT_USER } from "./queries";
import RepositoryList from "../Repository";

import Loading from "../Loading";
import ErrorMessage from "../Error";

const Repositories = () => (
  <Query
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
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

      return (
        <RepositoryList
          loading={loading}
          repositories={viewer.repositories}
          fetchMore={fetchMore}
          entry={"viewer"}
        />
      );
    }}
  </Query>
);

export default Repositories;
