import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";
import SearchForm from "./OrganisationSearch";
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
      <div style={{ width: "100%" }}>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
        <div id="content" style={{ marginTop: "60px" }}>
          <div className="container">
            <SearchForm startSearch={this.startSearch} />
            <div className="row">
              <div className="col-4">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link active" href="#">
                      Repos
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Issues
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Users
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-8">col-8</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
