import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";
import SearchForm from "./OrganisationSearch";
import { withRouter } from "react-router-dom";
import { GithubContent } from "./GithubContent";
import PropTypes from "prop-types";
class Organisation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.startSearch = this.startSearch.bind(this);
    this.menuSelection = this.menuSelection.bind(this);
    this.state = {
      newSearch: undefined,
      type: "repos"
    };
  }

  startSearch(text) {
    this.setState({
      newSearch: text
    });
    this.props.history.push({
      search: `query=${text}`
    });
  }

  menuSelection(arg) {
    if (arg.id === "users") {
      this.props.history.push({
        search: `query=${this.state.newSearch}&type=users`
      });
    } else if (arg.id === "repos") {
      this.props.history.push({
        search: `query=${this.state.newSearch}&type=repos`
      });
    }
  }

  render() {
    const { match, location } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
        <div style={{ marginTop: "60px" }}>
          <div className="container">
            <SearchForm startSearch={this.startSearch} match={match} />
            <div className="row">
              {location.search && (
                <GithubContent
                  match={match}
                  menuSelection={this.menuSelection}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Organisation);
