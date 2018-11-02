import React from "react";
import { Link } from "react-router-dom";

const RepositoryItem = ({ name, url, description, language, owner, match }) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link to={`${match.url}/${owner.login}/${name}`}>{name}</Link>
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

export default RepositoryItem;
