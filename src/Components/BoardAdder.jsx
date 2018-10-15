import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ClickOutside from "./ClickOutside";
import { startAddBoard } from "../actions/Board";

class BoardAdder extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = { isOpen: false, title: "" };
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = event => {
    // Dispatch action to put new empty board in redux store and db + push new url to history
    event.preventDefault();
    const { title } = this.state;
    if (title === "") {
      return;
    }
    const { user } = this.props;
    const boardData = {
      title,
      users: [user.uid],
      user
    };
    this.props.startAddBoard(boardData);
    this.setState({ isOpen: false, title: "" });
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.setState({ isOpen: false });
    }
  };

  render = () => {
    const { isOpen, title } = this.state;
    return isOpen ? (
      <ClickOutside handleClickOutside={this.toggleOpen}>
        <form onSubmit={this.handleSubmit} className="board-adder">
          <input
            autoFocus
            className="submit-board-input"
            type="text"
            value={title}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            spellCheck={false}
          />
          <input
            type="submit"
            value="Create"
            className="submit-board-button"
            disabled={title === ""}
          />
        </form>
      </ClickOutside>
    ) : (
      <button onClick={this.toggleOpen} className="add-board-button">
        Add a new board...
      </button>
    );
  };
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  startAddBoard: board => dispatch(startAddBoard(board))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardAdder);
