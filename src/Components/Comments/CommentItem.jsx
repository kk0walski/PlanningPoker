import React, { Component } from "react";
import Markdown from "react-markdown";

export default class CommentItem extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="CommentItem">
        <div>{comment.user.login}:</div>
        &nbsp;
        <Markdown source={comment.body} escapeHtml={false} />
      </div>
    );
  }
}
