import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Header from "./Header";
import classnames from "classnames";
import BoardHeader from "./BoardHeader";
import Lists from "./Lists";
import db from "../firebase/firebase";
import { justAddCard } from "../actions/Lists";

class Board extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    boardTitle: PropTypes.string.isRequired,
    boardColor: PropTypes.string.isRequired,
    listsOrder: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  componentWillMount = () => {
    const { boardId } = this.props;
    this.cards = db
      .collection("boards")
      .doc(boardId.toString())
      .collection("cards")
      .onSnapshot(querySnapchot => {
        querySnapchot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.props.justAddCard({ ...change.doc.data(), boardId });
          }
          if (change.type === "modified") {
            this.props.justAddCard({ ...change.doc.data(), boardId });
          }
          if (change.type === "removed") {
            console.log("REMOVE CARD: ", change.doc.data());
          }
        });
      });
  };

  componentWillUnmount = () => {
    this.cards();
  };

  render() {
    const { boardId, boardTitle, boardColor, listsOrder } = this.props;
    return (
      <div>
        <div className={classnames("board", boardColor)}>
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

const mapDispatchToProps = dispatch => ({
  justAddCard: cardData => dispatch(justAddCard(cardData))
  //justRemoveList: (boardId, listId) => dispatch(justRemoveList(boardId, listId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
