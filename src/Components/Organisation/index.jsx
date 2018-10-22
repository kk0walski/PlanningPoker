import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";
import Navigation from "../Navigation";

export default class Organisation extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
        <div className="home">
          <div className="main-content" style={{ margin: "40px 0" }}>
            <Navigation />
          </div>
        </div>
      </div>
    );
  }
}
