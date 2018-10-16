import React, { Component } from "react";
import Textarea from "react-textarea-autosize";
import { connect } from "react-redux";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import { FaArchive } from "react-icons/fa";
import { startChangeListName } from "../actions/Lists";
import { startRemoveList } from "../actions/Board";

class ListHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.listTitle
    };
  }

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    } else if (event.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleSubmit = () => {
    const { newTitle } = this.state;
    const { listTitle, listId, boardId } = this.props;
    if (newTitle === "") return;
    if (newTitle !== listTitle) {
      this.props.startChangeListName(boardId, listId, newTitle);
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    this.setState({ newTitle: this.props.listTitle, isOpen: false });
  };

  deleteList = () => {
    const { listId, boardId } = this.props;
    const listData = {
      listId,
      boardId
    };
    this.props.startRemoveList(listData);
  };

  openTitleEditor = () => {
    this.setState({ isOpen: true });
  };

  handleButtonKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.openTitleEditor();
    }
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { dragHandleProps, listTitle } = this.props;
    return (
      <div className="list-header">
        {isOpen ? (
          <div className="list-title-textarea-wrapper">
            <Textarea
              autoFocus
              useCacheForDOMMeasurements
              value={newTitle}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              className="list-title-textarea"
              onBlur={this.handleSubmit}
              spellCheck={false}
            />
          </div>
        ) : (
          <div
            {...dragHandleProps}
            role="button"
            tabIndex={0}
            onClick={this.openTitleEditor}
            onKeyDown={event => {
              this.handleButtonKeyDown(event);
              dragHandleProps.onKeyDown(event);
            }}
            className="list-title-button"
          >
            {listTitle}
          </div>
        )}
        <Wrapper className="delete-list-wrapper" onSelection={this.deleteList}>
          <Button className="delete-list-button">
            <FaArchive />
          </Button>
          <Menu className="delete-list-menu">
            <div className="delete-list-header">Are you sure?</div>
            <MenuItem className="delete-list-confirm">Archive</MenuItem>
          </Menu>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { listTitle, listId, boardId, listsOrder } = ownProps;
  return {
    listTitle,
    listId,
    boardId,
    listsOrder,
    list: state.Lists[boardId][listId],
    cards: state.Cards[boardId]
  };
};

const mapDispatchToProps = dispatch => ({
  startChangeListName: (boardId, listId, listTitle) =>
    dispatch(startChangeListName(boardId, listId, listTitle)),
  startRemoveList: listData => dispatch(startRemoveList(listData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListHeader);
