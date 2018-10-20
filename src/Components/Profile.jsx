import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import Header from "./Header";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const profile = this.props.data.viewer;
    if (profile) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <Helmet>
            <title>Home | Team Estimation Game</title>
          </Helmet>
          <Header />
          <div id="content">
            <div className="tabbed-pane-header">
              <div
                className={classnames(
                  "tabbed-pane-header-wrapper",
                  "u-clearfix"
                )}
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
                      src={profile.avatarUrl}
                      alt={profile.login}
                      className="user-icon"
                      title={profile.login}
                    />
                  </p>
                  <div className="abbed-pane-header-details">
                    <div className="tabbed-pane-header-details-name">
                      <h1 className="u-inline">{profile.login}</h1>
                      <p className="window-title-extra">{profile.email}</p>
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
    } else {
      return (
        <div>
          <Helmet>
            <title>Home | Team Estimation Game</title>
          </Helmet>
          <Header />
          <div id="content">
            <p>Loading</p>
          </div>
        </div>
      );
    }
  }
}

const profile = gql`
  {
    viewer {
      login
      email
      avatarUrl
      bio
      company
      companyHTML
      followers {
        totalCount
      }
      following {
        totalCount
      }
      gists {
        totalCount
      }
      issues {
        totalCount
      }
      repositories {
        totalCount
      }
    }
  }
`;

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(graphql(profile)(Profile));
