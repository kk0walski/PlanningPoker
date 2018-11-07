import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default class RepositoryItem extends Component {
  render() {
    const { name, description, language, owner } = this.props;
    if (owner) {
      return (
        <div>
          <div className="RepositoryItem-title">
            <h2>
              <Link to={`/repository/${owner.login}/${name}`}>{name}</Link>
            </h2>
          </div>

          <div className="RepositoryItem-description">
            <div
              className="RepositoryItem-description-info"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="RepositoryItem-description-details">
              <div>{language && <span>Language: {language}</span>}</div>
              <div>
                {owner && (
                  <span>
                    Owner: <a href={owner.url}>{owner.login}</a>
                  </span>
                )}
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
