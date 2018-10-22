import React, { Component } from "react";
import classnames from "classnames";

export default class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="tabbed-pane-header">
        <div className={classnames("tabbed-pane-header-wrapper", "u-clearfix")}>
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
    );
  }
}
