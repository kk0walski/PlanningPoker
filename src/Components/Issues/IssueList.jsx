import React, { Component } from "react";
import IssueItem from "./IssueItem";

export default class IssueList extends Component {
  render() {
    const { issues, repositoryOwner, repositoryName } = this.props;
    return (
      <div className="IssueList">
        {issues.map(node => {
          return (
            <IssueItem
              key={node.id}
              issue={node}
              repositoryOwner={repositoryOwner}
              repositoryName={repositoryName}
            />
          );
        })}
      </div>
    );
  }
}
