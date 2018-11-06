import React, { Component, Fragment } from "react";
import UserItem from "./UserItem";
import classnames from "classnames";

export default class UserList extends Component {
  render() {
    const { users } = this.props;
    return (
      <Fragment>
        {users.map(user => (
          <div
            key={user.node_id}
            className={classnames("user-list-item", "f5", "py-4", "d-flex")}
          >
            <UserItem {...user} />
          </div>
        ))}
      </Fragment>
    );
  }
}
