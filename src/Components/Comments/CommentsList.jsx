import React, { Component } from "react";
import CommentItem from "./CommentItem";

export default class CommentsList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="CommentList">
        {comments.map(comment => {
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </div>
    );
  }
}
