import React, { Component } from "react";
import { connect } from "react-redux";
import { FaArrow } from "react-icons/fa";
import PropTypes from "prop-types";

export default class Labels extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        labelId: PropTypes.string.isRequired,
        labelColor: PropTypes.string.isRequired,
        labelText: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
      })
    ).isRequired
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { labels } = this.props;
    const { isEditOpen, editLabel } = this.state;
    return (
      <div className="modal-color-picker" onKeyDown={this.handleKeyDown}>
        <div class="pop-over-header js-pop-over-header">
          <p class="pop-over-header-back-btn icon-sm">
            <FaArrow />
          </p>
          <span class="pop-over-header-title">
            {isEditOpen
              ? editLabel
                ? "Edycja Etykiety"
                : "Dodaj Etykietę"
              : "Etykiety"}
          </span>
        </div>
      </div>
    );
  }
}
