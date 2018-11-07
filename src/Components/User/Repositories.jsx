import React, { Component } from "react";
import RepositoryList from "../Repository/RepositoryList";
import Loading from "../Repository/Loading";
import FetchMore from "../Repository/FetchMore";

export default class Repositories extends Component {
  constructor(props) {
    super(props);
    this.fetchMore = this.fetchMore.bind(this);
    this.octokit = require("@octokit/rest")({
      timeout: 0,
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": "octokit/rest.js v1.2.3" // v1.2.3 will be current version
      },

      // custom GitHub Enterprise URL
      baseUrl: "https://api.github.com"
    });
    this.octokit.authenticate({
      type: "app",
      token: props.user.token
    });
    this.state = {
      hasNextPage: false,
      result: undefined,
      data: undefined
    };
  }

  componentWillMount() {
    const { login } = this.props;
    this.octokit.repos
      .getForUser({
        username: login,
        per_page: 10
      })
      .then(result => {
        this.setState({
          hasNextPage: this.octokit.hasNextPage(result),
          result,
          data: result.data
        });
      });
  }

  async fetchMore() {
    let response = await this.octokit.getNextPage(this.state.result);
    this.setState({
      data: this.state.data.concat(response.data),
      hasNextPage: this.octokit.hasNextPage(response),
      result: response
    });
  }

  render() {
    if (this.state.data) {
      const { data, hasNextPage } = this.state;
      return (
        <div>
          <RepositoryList repositories={data} />
          <FetchMore hasNextPage={hasNextPage} fetchMore={this.fetchMore} />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
