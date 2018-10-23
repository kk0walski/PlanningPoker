import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import Header from "../Header";
import ProfileQuery from "./ProfileHeaderQuery";
import Repositories from "./Repositories";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
        <div id="content">
          <ProfileQuery />
        </div>
        <div className={classnames("tabbed-pane-nav", "u-clearfix")}>
          <ul>
            <li className="tabbed-pane-nav-item">
              <p
                className={classnames("tabbed-pane-nav-item-button", "active")}
              >
                Repositories
              </p>
            </li>
          </ul>
        </div>
        <div className="repositories">
          <Repositories />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Profile);
