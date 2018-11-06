import React, { Component } from "react";
import { connect } from "react-redux";
import RepositoryList from "../Repository/RepositoryList";
import Loading from "../Repository/Loading";
import Pagination from "react-js-pagination";
import queryString from "query-string";
import UserList from "../User/UserList";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    console.log("PROPS: ", queryString(props.location.search));
    const params = queryString(props.location.search).query;
    console.log("PARAMS: ", params);
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
      total_count: 0,
      search: params.query,
      type: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    const newQuery = queryString.parse(nextProps.location.search);
    if (
      this.state.search !== newQuery.search ||
      this.state.type !== newQuery.search
    ) {
      this.setState({
        search: newQuery.search,
        type: newQuery.type,
        activePage: 1
      });
      if (newQuery.type === "users") {
        this.octokit.search
          .users({
            q: this.state.search,
            per_page: 10,
            page: 1
          })
          .then(result => {
            this.setState({
              hasNextPage: this.octokit.hasNextPage(result),
              result,
              data: result.data.items
            });
          });
      } else if (newQuery.type === "repos") {
        this.octokit.search
          .repos({
            q: this.state.search,
            per_page: 10,
            page: 1
          })
          .then(result => {
            this.setState({
              hasNextPage: this.octokit.hasNextPage(result),
              result,
              data: result.data.items
            });
          });
      }
    }
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
        q: this.state.search,
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
      const { data, type } = this.state;
      if (type === "users") {
        return (
          <div>
            <UserList users={data} />
            <nav
              aria-label="Page navigation example"
              style={{ marginTop: "10px" }}
            >
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.total_count}
                pageRangeDisplayed={10}
                onChange={this.handlePageChange}
                innerClass="pagination justify-content-center"
                itemClass="page-item"
                linkClass="page-link"
              />
            </nav>
          </div>
        );
      } else {
        return (
          <div>
            <RepositoryList repositories={data} />
            <nav
              aria-label="Page navigation example"
              style={{ marginTop: "10px" }}
            >
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.total_count}
                pageRangeDisplayed={10}
                onChange={this.handlePageChange}
                innerClass="pagination justify-content-center"
                itemClass="page-item"
                linkClass="page-link"
              />
            </nav>
          </div>
        );
      }
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Home);
