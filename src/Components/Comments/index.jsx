import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../Loading";
import FetchMore from "../FetchMore";
import CommentsList from "./CommentsList";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.fetchMore = this.fetchMore.bind(this);
    const { owner, project } = props;
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
      data: undefined,
      owner,
      project
    };
  }

  componentDidMount() {
    const { owner, project } = this.state;
    const { issue } = this.props;
    this.octokit.issues
      .getComments({
        owner,
        repo: project,
        number: issue.number,
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
    const { data, hasNextPage } = this.state;
    if (data) {
      return (
        <div>
          <CommentsList comments={data} />
          <FetchMore hasNextPage={hasNextPage} fetchMore={this.fetchMore} />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Comments);
