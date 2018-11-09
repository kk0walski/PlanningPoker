import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import Header from "../Header";
import Loading from "../Loading";
import Repositories from "./Repositories";

class User extends Component {
  constructor(props) {
    super(props);
    const { login } = props.match.params;
    this.octokit = require("@octokit/rest")({
      timeout: 0,
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": "octokit/rest.js v1.2.3" // v1.2.3 will be current version
      },

      // custom GitHub Enterprise URL
      baseUrl: "https://api.github.com"
    });
    this.octokit.authenticate({
      type: "app",
      token: props.user.token
    });
    this.state = {
      hasNextPage: false,
      result: undefined,
      data: undefined,
      total_count: 0,
      login
    };
  }

  componentDidMount() {
    const { login } = this.state;
    this.octokit.users
      .getForUser({
        username: login
      })
      .then(result => {
        this.setState({
          user: result.data
        });
      });
  }

  render() {
    const { match } = this.props;
    const { user, login } = this.state;
    if (user) {
      return (
        <div style={{ width: "100%" }}>
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
                      src={user.avatar_url}
                      alt={user.name}
                      className="user-icon"
                      title={user.login}
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
                    Repositories
                  </p>
                </li>
              </ul>
            </div>
            <div className="repositories">
              <Repositories
                match={match}
                login={login}
                user={this.props.user}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(User);
