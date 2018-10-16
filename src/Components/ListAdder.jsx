import React from "react";
import Textarea from "react-textarea-autosize";
//import { startAddList } from '../actions/Board';
import { connect } from "react-redux";

class ListAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      listTitle: ""
    };
  }
  handleBlur = () => {
    this.setState({ isOpen: false });
  };
  handleChange = event => {
    this.setState({ listTitle: event.target.value });
  };
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    } else if (event.keyCode === 27) {
      this.setState({ isOpen: false, listTitle: "" });
    }
  };
  handleSubmit = () => {
    const { boardId, listsOrder } = this.props;
    const { listTitle } = this.state;
    if (listTitle === "") return;
    //this.props.startAddList(boardId, listsOrder, listTitle)
    this.setState({ isOpen: false, listTitle: "" });
  };
  render = () => {
    const { isOpen, listTitle } = this.state;
    if (!isOpen) {
      return (
        <button
          onClick={() => this.setState({ isOpen: true })}
          className="add-list-button"
        >
          Add a new list...
        </button>
      );
    }
    return (
      <div className="list">
        <Textarea
          autoFocus
          useCacheForDOMMeasurements
          value={listTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="list-adder-textarea"
          onBlur={this.handleBlur}
          spellCheck={false}
        />
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { listsOrder, boardId } = ownProps;
  return {
    boardId,
    listsOrder
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   startAddList: (boardId, listsKey, listTitle) => dispatch(startAddList(boardId, listsKey, listTitle))
// });

export default connect(mapStateToProps)(ListAdder);
