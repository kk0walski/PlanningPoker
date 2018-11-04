import React, { Component } from "react";
import { connect } from "react-redux";
import RepositoryList from "../Repository/RepositoryList";
import Loading from "../Repository/Loading";
import FetchMore from "../Repository/FetchMore";

class Home extends Component {
  constructor(props) {
    super(props);
    this.search = props.match.params.search;
    this.octopage = require("github-pagination");
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
    this.octokit.search
      .repos({
        q: this.search,
        per_page: 10
      })
      .then(result => {
        this.setState({
          hasNextPage: this.octokit.hasNextPage(result),
          result,
          data: result.data.items
        });
      });
  }

  render() {
    if (this.state.data) {
      const { data, result, hasNextPage } = this.state;
      const { match } = this.props;
      console.log("DATA: ", result);
      return (
        <div>
          <RepositoryList repositories={data} match={match} />
          <FetchMore hasNextPage={hasNextPage} fetchMore={this.fetchMore} />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Home);
