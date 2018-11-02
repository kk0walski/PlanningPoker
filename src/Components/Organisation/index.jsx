import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";
import SearchHeader from "./SearchHeader";

export default class Organisation extends Component {
  constructor(props) {
    super(props);
    this.startSearch = this.startSearch.bind(this);
    this.state = {
      search: undefined
    };
  }

  startSearch(text) {
    this.setState({
      search: text
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Helmet>
            <title>Home | Team Estimation Game</title>
          </Helmet>
          <Header />
          <SearchHeader startSearch={this.startSearch} />
        </div>
        <div className="row">
          <div className="col-8">col-8</div>
          <div className="col-4">col-4</div>
        </div>
      </div>
    );
  }
}
