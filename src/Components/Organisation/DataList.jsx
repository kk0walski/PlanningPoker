import React, { Component } from "react";
import UserList from "../User/UserList";
import RepositoryList from "../Repository/RepositoryList";

export default class DataList extends Component {
  render() {
    const { type, data } = this.props;
    if (data) {
      if (type === "users") {
        return <UserList users={data} />;
      } else {
        return <RepositoryList repositories={data} />;
      }
    }
  }
}
