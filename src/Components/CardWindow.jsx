import React, { Component } from "react";
import Modal from "react-modal";
import { FaRegClipboard } from "react-icons/fa";
import { MdFormatAlignLeft } from "react-icons/md";
import classnames from "classnames";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";

export default class CardDetailModal extends Component {
  handleRequestClose = () => {
    const { toggleCardEditor } = this.props;
    toggleCardEditor();
  };

  render() {
    const { title, id } = this.props.card;
    const { listTitle, boardId } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.handleRequestClose}
        contentLabel="CARD"
        overlayClassName="window-overlay"
        className="window"
      >
        <div className="window-wrapper">
          <div className="window-header">
            <p className="x" onClick={this.props.toggleCardEditor} />
            <span className="window-header-icon">
              <FaRegClipboard className="icon-lg" />
            </span>
            <div className="window-title">
              <CardTitle cardTitle={title} cardId={id} boardId={boardId} />
            </div>
            <div className="window-header-inline-content">
              <p className={classnames("u-inline-block", "u-bottom")}>
                na liście: {listTitle}
              </p>
            </div>
          </div>
          <div className="window-main-col">
            <div className="window-module">
              <div
                className={classnames(
                  "window-module-title",
                  "window-module-title-no-divider"
                )}
              >
                <span className="window-header-icon">
                  <MdFormatAlignLeft className="icon-lg" />
                </span>
                <div className="window-title">
                  <h3>Opis</h3>
                </div>
                <CardDescription />
              </div>
            </div>
          </div>
          <div className="window-sidebar" />
        </div>
      </Modal>
    );
  }
}
