import React, { Component, Fragment } from "react";
import RepositoryItem from "./RepositoryItem";

export default class RepositoryList extends Component {
  render() {
    const { repositories, match } = this.props;
    return (
      <Fragment>
        {repositories.map(repository => (
          <div key={repository.node_id} className="RepositoryItem">
            <RepositoryItem {...repository} match={match} />
          </div>
        ))}
      </Fragment>
    );
  }
}
