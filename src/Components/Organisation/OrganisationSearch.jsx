import React, { Component } from "react";
import { Route } from "react-router";
import { GithubContent } from "./GithubContent";

export default class OrganisationSearch extends Component {
  constructor(props) {
    super(props);
    this.startSearch = this.startSearch.bind(this);
    this.state = {
      newSearch: ""
    };
  }

  revertSearch = () => {
    this.setState({ newSearch: "" });
  };

  startSearch(text) {
    this.setState({
      newSearch: text
    });
  }

  submitSearch = () => {
    const { newSearch } = this.state;
    this.startSearch(newSearch);
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.submitSearch();
    } else if (event.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleChange = event => {
    this.setState({ newSearch: event.target.value });
  };

  handleFocus = event => {
    event.target.select();
  };

  render() {
    const { newSearch } = this.state;
    const { match } = this.props;
    if (newSearch && newSearch !== "") {
      console.log("NEW_MATCH: ", match);
      return (
        <Route patch={`${match.patch}/:search`} component={GithubContent} />
      );
    } else {
      return (
        <div className="row">
          <div className="col-12">
            <input
              autoFocus
              value={newSearch}
              type="text"
              className="form-control"
              id="search"
              placeholder="Search Github"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.revertSearch}
              spellCheck={false}
            />
          </div>
        </div>
      );
    }
  }
}
