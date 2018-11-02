import React, { Component } from "react";
import Search from "./OrganisationSearch";

export default class SearchHeader extends Component {
  render() {
    const { startSearch } = this.props;
    return (
      <div className="board-header" style={{ marginTop: "10px" }}>
        <Search startSearch={startSearch} />
      </div>
    );
  }
}
