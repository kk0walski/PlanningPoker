import React, { Component, Fragment } from "react";
import RepositoryItem from "./RepositoryItem";

export default class RepositoryList extends Component {
  render() {
    const { repositories } = this.props;
    return (
      <Fragment>
        {repositories.map(repository => (
          <div key={repository.node_id} className="RepositoryItem">
            <RepositoryItem {...repository} />
          </div>
        ))}
      </Fragment>
    );
  }
}
