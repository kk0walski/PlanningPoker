import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Board from "./Board";

// This components only purpose is to redirect requests for board pages that don't exist
// or which the user is not authorized to visit, in order to prevent errors

class BoardContainer extends Component {
  static propTypes = {
    board: PropTypes.object
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

export default connect(mapStateToProps)(BoardContainer);
