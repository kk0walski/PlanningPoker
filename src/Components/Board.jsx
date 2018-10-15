import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Header from "./Header";
import classnames from "classnames";
import BoardHeader from "./BoardHeader";
import Lists from "./Lists";

class Board extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    boardTitle: PropTypes.string.isRequired,
    boardColor: PropTypes.string.isRequired,
    listsOrder: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  render() {
    const { boardId, boardTitle, listsOrder } = this.props;
    return (
      <div>
        <div className={classnames("board", "blue")}>
          <Helmet>
            <title>{boardTitle} | Team Estimation Game</title>
          </Helmet>
          <Header />
          <BoardHeader />
          <div className="lists-wrapper">
            <Lists boardId={boardId} listsOrder={listsOrder} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { board } = ownProps;
  return {
    listsOrder: board.lists ? board.lists : [],
    boardTitle: board.title,
    boardColor: board.color,
    boardId: board.id
  };
};

export default connect(mapStateToProps)(Board);
