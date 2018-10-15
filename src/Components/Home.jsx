import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import slugify from "slugify";
import Header from "./Header";
import BoardAdder from "./BoardAdder";
import classnames from "classnames";
import { firebase } from "../firebase/firebase";
import db from "../firebase/firebase";
import { justAddBoard, justRemoveBoard } from "../actions/Board";

class Home extends Component {
  static propTypes = {
    boards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    history: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { user } = this.props;
    if (user) {
      this.boards = db
        .collection("boards")
        .where("users", "array-contains", user.uid.toString())
        .onSnapshot(querySnapchot => {
          querySnapchot.docChanges().forEach(change => {
            if (change.type === "added") {
              this.props.justAddBoard(change.doc.data());
            }
            if (change.type === "modified") {
              this.props.justAddBoard(change.doc.data());
            }
            if (change.type === "removed") {
              console.log("Removed board: ", change.doc.data());
            }
          });
        });
    }
  }

  componentWillUnmount() {
    console.log("Listener UnMounting");
    this.boards();
  }

  render() {
    const { boards, history } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Helmet>
          <title>Home | Planning Poker</title>
        </Helmet>
        <Header />
        <div className="home">
          <div className="main-content">
            <h1>Boards</h1>
            <div className="boards">
              {boards.map(board => (
                <Link
                  key={board.id}
                  className={classnames("board-link", board.color)}
                  to={`/b/${board.id}/${slugify(board.title, {
                    lower: true
                  })}`}
                >
                  <div className="board-link-title">{board.title}</div>
                </Link>
              ))}
              <BoardAdder history={history} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  var user = firebase.auth().currentUser;
  return {
    user,
    boards: Object.values(state.Board)
  };
};

const mapDispatchToProps = dispatch => ({
  justAddBoard: board => dispatch(justAddBoard(board)),
  justRemoveBoard: boardId => dispatch(justRemoveBoard(boardId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
