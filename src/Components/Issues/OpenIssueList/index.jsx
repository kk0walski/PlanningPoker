import React, { Component } from "react";
import { Query } from "react-apollo";

import { GET_OPEN_ISSUES_OF_REPOSITORY } from "./queries";
import IssueItem from "../IssueItem";
import FetchMore from "../../FetchMore";
import Loading from "../../Loading";
import ErrorMessage from "../../Error";

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    repository: {
      ...previousResult.repository,
      issues: {
        ...previousResult.repository.issues,
        ...fetchMoreResult.repository.issues,
        edges: [
          ...previousResult.repository.issues.edges,
          ...fetchMoreResult.repository.issues.edges
        ]
      }
    }
  };
};

export default class Issues extends Component {
  render() {
    const { owner, project } = this.props.match.params;
    return (
      <div className="Issues">
        <Query
          query={GET_OPEN_ISSUES_OF_REPOSITORY}
          variables={{
            owner,
            project
          }}
          notifyOnNetworkStatusChange={true}
        >
          {({ data, loading, error, fetchMore }) => {
            if (error) {
              return <ErrorMessage error={error} />;
            }

            const { repository } = data;

            if (loading && !repository) {
              return <Loading />;
            }

            if (!repository.issues.edges.length) {
              return <div className="IssueList">No issues ...</div>;
            }

            return (
              <IssueList
                issues={repository.issues}
                loading={loading}
                repositoryOwner={owner}
                repositoryName={project}
                fetchMore={fetchMore}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

const IssueList = ({
  issues,
  loading,
  repositoryOwner,
  repositoryName,
  fetchMore
}) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem
        key={node.id}
        issue={node}
        repositoryOwner={repositoryOwner}
        repositoryName={repositoryName}
      />
    ))}

    <FetchMore
      loading={loading}
      hasNextPage={issues.pageInfo.hasNextPage}
      variables={{
        cursor: issues.pageInfo.endCursor,
        repositoryOwner,
        repositoryName
      }}
      updateQuery={updateQuery}
      fetchMore={fetchMore}
    >
      Issues
    </FetchMore>
  </div>
);
