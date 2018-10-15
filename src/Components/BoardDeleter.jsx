import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import { FaTrash } from "react-icons/fa";
import { startRemoveBoard } from "../actions/Board";

class BoardDeleter extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ boardId: PropTypes.string })
    }).isRequired
  };

  handleSelection = () => {
    const { match, history } = this.props;
    const { boardId } = match.params;
    this.props.startRemoveBoard({ boardId });
    history.push("/");
  };

  render = () => (
    <Wrapper
      className="board-deleter-wrapper"
      onSelection={this.handleSelection}
    >
      <Button className="board-deleter-button">
        <div className="modal-icon">
          <FaTrash />
        </div>
        <div className="board-header-right-text">&nbsp;Delete board</div>
      </Button>
      <Menu className="board-deleter-menu">
        <div className="board-deleter-header">Are you sure?</div>
        <MenuItem className="board-deleter-confirm">Delete</MenuItem>
      </Menu>
    </Wrapper>
  );
}

const mapDispatchToProps = dispatch => ({
  startRemoveBoard: boardId => dispatch(startRemoveBoard(boardId))
});

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(BoardDeleter)
);
