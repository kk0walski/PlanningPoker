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

  constructor(props) {
    super(props);
    this.state = {
      startX: null,
      startScrollX: null
    };
  }

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

  // The following three methods implement dragging of the board by holding down the mouse
  handleMouseDown = ({ target, clientX }) => {
    if (target.className !== "list-wrapper" && target.className !== "lists") {
      return;
    }
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      startX: clientX,
      startScrollX: window.scrollX
    });
  };

  // Go to new scroll position every time the mouse moves while dragging is activated
  handleMouseMove = ({ clientX }) => {
    const { startX, startScrollX } = this.state;
    const scrollX = startScrollX - clientX + startX;
    window.scrollTo(scrollX, 0);
    const windowScrollX = window.scrollX;
    if (scrollX !== windowScrollX) {
      this.setState({
        startX: clientX + windowScrollX - startScrollX
      });
    }
  };

  // Remove drag event listeners
  handleMouseUp = () => {
    if (this.state.startX) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
      this.setState({ startX: null, startScrollX: null });
    }
  };

  handleWheel = ({ target, deltaY }) => {
    // Scroll page right or left as long as the mouse is not hovering a card-list (which could have vertical scroll)
    if (
      target.className !== "list-wrapper" &&
      target.className !== "lists" &&
      target.className !== "open-composer-button" &&
      target.className !== "list-title-button"
    ) {
      return;
    }
    // Move the board 80 pixes on every wheel event
    if (Math.sign(deltaY) === 1) {
      window.scrollTo(window.scrollX + 80, 0);
    } else if (Math.sign(deltaY) === -1) {
      window.scrollTo(window.scrollX - 80, 0);
    }
  };

  render() {
    const { boardId, boardTitle, boardColor, listsOrder } = this.props;
    return (
      <div className={classnames("board", boardColor)}>
        <Helmet>
          <title>{boardTitle} | Team Estimation Game</title>
        </Helmet>
        <Header />
        <BoardHeader />
        <div
          className="lists-wrapper"
          onMouseDown={this.handleMouseDown}
          onWheel={this.handleWheel}
        >
          <Lists boardId={boardId} listsOrder={listsOrder} />
        </div>
        <div className="board-underlay" />
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
