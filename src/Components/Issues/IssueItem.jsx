import React, { Component } from "react";
import { withState } from "recompose";
import Markdown from "react-markdown";
import Button from "../Button";
import Comments from "../Comments";
import Link from "../Link";

class IssueItem extends Component {
  render() {
    const {
      issue,
      repositoryOwner,
      repositoryName,
      isShowComments,
      onShowComments
    } = this.props;
    return (
      <div className="IssueItem">
        <Button onClick={() => onShowComments(!isShowComments)}>
          {isShowComments ? "-" : "+"}
        </Button>

        <div className="IssueItem-content">
          <h3>
            <Link href={issue.url}>{issue.title}</Link>
          </h3>
          <Markdown source={issue.body} escapeHtml={false} />

          {isShowComments && (
            <Comments
              owner={repositoryOwner}
              project={repositoryName}
              issue={issue}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withState("isShowComments", "onShowComments", false)(IssueItem);
