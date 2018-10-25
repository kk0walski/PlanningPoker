import React, { Component } from "react";
import classnames from "classnames";

export default class IssuesHeader extends Component {
  render() {
    const { repository } = this.props;
    return (
      <div className="tabbed-pane-header">
        <div className={classnames("tabbed-pane-header-wrapper", "u-clearfix")}>
          <div className="tabbed-pane-header-content">
            <div className="abbed-pane-header-details">
              <div className="tabbed-pane-header-details-name">
                <h1 className="u-inline">{repository.name}</h1>
                <p className="window-title-extra">{repository.url}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
