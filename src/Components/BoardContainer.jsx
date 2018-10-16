import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Board from "./Board";
import db from "../firebase/firebase";
import { justAddList, justRemoveList } from "../actions/Board";

// This components only purpose is to redirect requests for board pages that don't exist
// or which the user is not authorized to visit, in order to prevent errors

class BoardContainer extends Component {
  static propTypes = {
    board: PropTypes.object
  };

  componentWillMount = () => {
    const { boardId } = this.props;
    console.log("SŁUCHANIE LIST");
    this.lists = db
      .collection("boards")
      .doc(boardId.toString())
      .collection("lists")
      .onSnapshot(querySnapchot => {
        querySnapchot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.props.justAddList({ ...change.doc.data(), boardId });
          }
          if (change.type === "modified") {
            this.props.justAddList({ ...change.doc.data(), boardId });
          }
          if (change.type === "removed") {
            this.props.justRemoveList(boardId, change.doc.data().id);
          }
        });
      });
  };

  componentWillUnmount = () => {
    this.lists();
  };

  render = () => {
    const { board } = this.props;
    if (board) {
      return <Board board={board} />;
    } else {
      return <Redirect to="/" />;
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const loadedBoard = state.Board[boardId];
  return {
    board: loadedBoard,
    boardId
  };
};

const mapDispatchToProps = dispatch => ({
  justAddList: list => dispatch(justAddList(list)),
  justRemoveList: (boardId, listId) => dispatch(justRemoveList(boardId, listId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);
