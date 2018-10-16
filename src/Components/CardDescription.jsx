import React, { Component } from "react";
import Markdown from "react-markdown";
import Textarea from "react-textarea-autosize";
import classnames from "classnames";
import ClickOutside from "./ClickOutside";
import { MdClose } from "react-icons/md";

export default class CardDescription extends Component {
  constructor() {
    super();
    this.openEditor.bind(this);
    this.state = {
      newText: "",
      isOpen: false
    };
  }

  openEditor = () => {
    this.setState({ isOpen: !this.state.isOpen });
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
