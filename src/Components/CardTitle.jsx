import React, { Component } from "react";
import ClickOutside from "./ClickOutside";

export default class CardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.cardTitle
    };
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  submitTitle = () => {
    const { cardTitle } = this.props;
    const { newTitle } = this.state;
    if (newTitle === "") return;
    if (cardTitle !== newTitle) {
      //this.props.changecardTitle(boardId, newTitle);
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { cardTitle } = this.props;
    this.setState({ newTitle: cardTitle, isOpen: false });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.submitTitle();
    } else if (event.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleFocus = event => {
    event.target.select();
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { cardTitle } = this.props;
    return isOpen ? (
      <ClickOutside handleClickOutside={this.revertTitle}>
        <input
          autoFocus
          value={newTitle}
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlur={this.revertTitle}
          onFocus={this.handleFocus}
          className="mod-card-back-title"
          spellCheck={false}
        />
      </ClickOutside>
    ) : (
      <button className="card-title-button" onClick={this.handleClick}>
        <h2>{cardTitle}</h2>
      </button>
    );
  }
}
