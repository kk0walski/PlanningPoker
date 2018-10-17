import React, { Component } from "react";
import { connect } from "react-redux";
import Markdown from "react-markdown";
import Textarea from "react-textarea-autosize";
import classnames from "classnames";
import ClickOutside from "./ClickOutside";
import { MdClose } from "react-icons/md";
import { startChangeCardDescription } from "../actions/Cards";

class CardDescription extends Component {
  constructor(props) {
    super(props);
    this.openEditor.bind(this);
    this.state = {
      newText: props.cardDescription ? props.cardDescription : "",
      isOpen: false
    };
  }

  openEditor = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleChange = event => {
    this.setState({ newText: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.submitDescription();
    } else if (event.keyCode === 27) {
      this.revertDescription();
    }
  };

  revertDescription = () => {
    const { cardDescription } = this.props;
    this.setState({ newText: cardDescription, isOpen: false });
  };

  submitDescription = () => {
    const { boardId, cardId, cardDescription } = this.props;
    const { newText } = this.state;
    if (newText === "") return;
    if (cardDescription !== newText) {
      this.props.startChangeCardDescription(boardId, cardId, cardDescription);
    }
    this.setState({ isOpen: false });
  };

  render() {
    const { newText, isOpen } = this.state;
    if (isOpen) {
      return (
        <ClickOutside handleClickOutside={this.openEditor}>
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={newText}
            className="card-adder-textarea"
            placeholder="Dodaj bardziej szczegółowy opis..."
            spellCheck={false}
            style={{ minHeight: 108, marginTop: 5 }}
            onBlur={this.openEditor}
          />
          <div className={classnames("edit-controls", "u-clearfix")}>
            <input
              className={classnames("primary", "mod-submit-edit")}
              type="submit"
              value="Zapisz"
            />
            <MdClose className="icon-x-lg" onClick={this.openEditor} />
          </div>
        </ClickOutside>
      );
    } else {
      if (newText !== "") {
        return (
          <p className="u-bottom" onClick={this.openEditor}>
            <Markdown escapeHtml={true} source={newText} />
          </p>
        );
      } else {
        return (
          <div className="u-bottom" onClick={this.openEditor}>
            <p className="card-detail-fake-text-area">
              Dodaj bardziej szczegółowy opis...
            </p>
          </div>
        );
      }
    }
  }
}

const mapDispatchToProps = dispatch => ({
  startChangeCardDescription: (boardId, cardId, cardDescription) =>
    dispatch(startChangeCardDescription(boardId, cardId, cardDescription))
});

export default connect(
  undefined,
  mapDispatchToProps
)(CardDescription);
