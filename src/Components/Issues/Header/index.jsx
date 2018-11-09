import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../Loading";
import classnames from "classnames";

class Header extends Component {
  constructor(props) {
    super(props);
    const { owner, name } = props;
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
      result: undefined,
      data: undefined,
      owner,
      name
    };
  }

  componentDidMount() {
    const { owner, name } = this.state;
    this.octokit.repos
      .get({
        owner,
        repo: name
      })
      .then(result => {
        this.setState({
          result,
          data: result.data
        });
      });
  }

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <div className="tabbed-pane-header">
          <div
            className={classnames("tabbed-pane-header-wrapper", "u-clearfix")}
          >
            <div className="tabbed-pane-header-content">
              <div className="abbed-pane-header-details">
                <div className="tabbed-pane-header-details-name">
                  <h1 className="u-inline">{data.name}</h1>
                  <p className="window-title-extra">{data.url}</p>
                </div>
              </div>
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

export default connect(mapStateToProps)(Header);
