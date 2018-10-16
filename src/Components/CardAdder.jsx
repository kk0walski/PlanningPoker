import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import ClickOutside from "./ClickOutside";
//import { startAddCard } from '../actions/List';

class CardAdder extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      newText: "",
      isOpen: false
    };
  }

  toggleCardComposer = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleChange = event => {
    this.setState({ newText: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      this.handleSubmit(event);
    } else if (event.keyCode === 27) {
      this.toggleCardComposer();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { newText } = this.state;
    const { list, boardId } = this.props;
    if (newText === "") return;
    //this.props.startAddCard(boardId, list, newText);
    this.toggleCardComposer();
    this.setState({ newText: "" });
  };

  render() {
    const { newText, isOpen } = this.state;
    return isOpen ? (
      <ClickOutside handleClickOutside={this.toggleCardComposer}>
        <form
          onSubmit={this.handleSubmit}
          className="card-adder-textarea-wrapper"
        >
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            minRows={1}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={newText}
            className="card-adder-textarea"
            placeholder="Add a new card..."
            spellCheck={false}
            onBlur={this.toggleCardComposer}
          />
        </form>
      </ClickOutside>
    ) : (
      <button onClick={this.toggleCardComposer} className="add-card-button">
        +
      </button>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { list, boardId } = ownProps;
  return {
    list,
    boardId
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   startAddCard: (boardId, list, newText) => dispatch(startAddCard(boardId, list, newText))
// });

export default connect(mapStateToProps)(CardAdder);
