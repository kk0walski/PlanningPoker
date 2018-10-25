import React, { Component } from "react";
import Repository from "./IssuesHeader";
import { Query } from "react-apollo";
import Loading from "../../Loading";
import ErrorMessage from "../../Error";

import { GET_REPOSITORY } from "./queries";

export default class IssuesHeader extends Component {
  render() {
    const { repositoryOwner, repositoryName } = this.props;
    return (
      <Query
        query={GET_REPOSITORY}
        variables={{
          repositoryOwner,
          repositoryName
        }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading, error }) => {
          if (error) {
            return <ErrorMessage error={error} />;
          }

          if (!data) {
            return <Loading isCenter={true} />;
          }
          const { repository } = data;

          if (loading && !repository) {
            return <Loading isCenter={true} />;
          }

          const repositoryData = {
            name: repository.name,
            url: repository.url,
            descriptionHTML: repository.descriptionHTML,
            language: repository.primaryLanguage.name,
            company: repository.owner.login
          };

          return (
            <Repository
              loading={loading}
              repository={repositoryData}
              entry={"viewer"}
            />
          );
        }}
      </Query>
    );
  }
}
