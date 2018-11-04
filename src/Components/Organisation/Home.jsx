import React, { Component } from "react";
import { connect } from "react-redux";
import RepositoryList from "../Repository/RepositoryList";
import Loading from "../Repository/Loading";
import Pagination from "react-js-pagination";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.search = props.match.params.search;
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
      total_count: 0
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
          data: result.data.items,
          activePage: 1,
          total_count: result.data.total_count
        });
      });
  }

  handlePageChange(pageNumber) {
    this.octokit.search
      .repos({
        q: this.search,
        per_page: 10,
        page: pageNumber
      })
      .then(result => {
        this.setState({
          hasNextPage: this.octokit.hasNextPage(result),
          result,
          data: result.data.items,
          activePage: pageNumber
        });
      });
  }

  render() {
    if (this.state.data) {
      const { data } = this.state;
      const { match } = this.props;
      return (
        <div>
          <RepositoryList repositories={data} match={match} />
          <nav
            aria-label="Page navigation example"
            style={{ marginTop: "10px" }}
          >
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={this.state.total_count}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              innerClass="pagination justify-content-center"
              itemClass="page-item"
              linkClass="page-link"
            />
          </nav>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Home);
