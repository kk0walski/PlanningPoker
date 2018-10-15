import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import Header from "./Header";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <Helmet>
          <title>Home | Team Estimation Game</title>
        </Helmet>
        <Header />
        <div id="content">
          <div className="tabbed-pane-header">
            <div
              className={classnames("tabbed-pane-header-wrapper", "u-clearfix")}
            >
              <div className="tabbed-pane-header-content">
                <p
                  className={classnames(
                    "tabbed-pane-header-image",
                    "profile-image",
                    "is-editable"
                  )}
                >
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="user-icon"
                    title={user.name}
                  />
                </p>
                <div className="abbed-pane-header-details">
                  <div className="tabbed-pane-header-details-name">
                    <h1 className="u-inline">{user.displayName}</h1>
                    <p className="window-title-extra">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classnames("tabbed-pane-nav", "u-clearfix")}>
            <ul>
              <li className="tabbed-pane-nav-item">
                <p
                  className={classnames(
                    "tabbed-pane-nav-item-button",
                    "active"
                  )}
                >
                  Profil
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Profile);
