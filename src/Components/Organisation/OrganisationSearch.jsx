import React, { Component } from "react";

export default class OrganisationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSearch: ""
    };
  }

  revertSearch = () => {
    this.setState({ newSearch: "" });
  };

  submitSearch = () => {
    const { newSearch } = this.state;
    if (newSearch === "") return;
    else {
      this.props.startSearch(newSearch);
    }
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
    return (
      <input
        autoFocus
        value={newSearch}
        type="text"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.revertSearch}
        className="board-title-input"
        spellCheck={false}
      />
    );
  }
}