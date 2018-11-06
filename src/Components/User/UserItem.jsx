import React, { Component } from "react";
import Loading from "./Loading";
import classnames from "classnames";
import { Link } from "react-router-dom";

export default class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const { url } = this.props;
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      const { avatar_url, bio, login, name } = this.state.dataSource;
      return (
        <div className={classnames("d-flex", "flex-auto")}>
          <img
            src={avatar_url}
            alt={login}
            className={classnames("avatar", "position-relative")}
            title={name}
            width={48}
            height={48}
          />
          <div className={classnames("user-list-info", "ml-2", "min-width-0")}>
            <Link to={`user/${login}`}>
              <em>{login}</em>
            </Link>
            <div
              className={classnames(
                "d-block",
                "d-md-inline",
                "f4",
                "mt-2",
                "mt-md-0",
                "ml-md-1"
              )}
            >
              <em>{name}</em>
            </div>
            <p className={classnames("f5", "mt-2")}>{bio}</p>
          </div>
        </div>
      );
    }
  }
}
