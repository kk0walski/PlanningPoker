import React, { Component } from "react";
import { connect } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";
import {
  startAddLabel,
  startChangeLabelText,
  startChangeLabelColor,
  startDeleteLabel,
  startDeleteCardFromLabel,
  startAddCardToLabel
} from "../actions/Label";

class Labels extends Component {
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
    this.state = {
      isEditOpen: false,
      isAddOpen: false,
      editLabel: undefined,
      newColor: undefined,
      newText: undefined
    };
  }

  handleAdd(event) {
    event.preventDefault();
    const { newColor, newText } = this.state;
    const { boardId } = this.props;
    const labelData = {
      boardId,
      labelColor: newColor,
      labelText: newText
    };
    this.props.startAddLabel(labelData);
    this.setState({
      isEditOpen: !this.state.isEditOpen,
      editLabel: undefined,
      newColor: undefined,
      newText: undefined
    });
  }

  handleDelete(event) {
    event.preventDefault();
    const { editLabel } = this.state;
    const { boardId } = this.props;
    this.props.startDeleteLabel(boardId, editLabel.id);
    this.setState({
      isEditOpen: !this.state.isEditOpen,
      editLabel: undefined,
      newColor: undefined,
      newText: undefined
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { editLabel, newColor, newText } = this.state;
    const { boardId } = this.props;
    this.props.startChangeLabelColor(boardId, editLabel.id, newColor);
    this.props.startChangeLabelText(boardId, editLabel.id, newText);
    this.setState({
      isEditOpen: !this.state.isEditOpen,
      editLabel: undefined,
      newColor: undefined,
      newText: undefined
    });
  }

  toggleEditOpen(event, label) {
    if (label) {
      this.setState({
        isEditOpen: !this.state.editLabel,
        editLabel: label,
        newColor: label.color,
        newText: label.text
      });
    } else {
      this.setState({
        isEditOpen: !this.state.editLabel
      });
    }
  }
  setColor(event, color) {
    event.preventDefault();
    this.setState({
      newColor: color
    });
  }

  setText(event, text) {
    event.preventDefault();
    this.setState({
      newText: text
    });
  }

  addLabel = (event, label) => {
    event.preventDefault();
    const { card, boardId } = this.props;
    if (label.cards !== undefined && label.cards[card.id] !== undefined) {
      this.props.startDeleteCardFromLabel(boardId, label.id, card.id);
    } else {
      this.props.startAddCardToLabel(boardId, label.id, card.id);
    }
  };

  render() {
    const { card, labels } = this.props;
    const { isEditOpen, editLabel } = this.state;
    return (
      <div className="modal-color-picker" onKeyDown={this.handleKeyDown}>
        <div className="pop-over-header js-pop-over-header">
          <p className="pop-over-header-back-btn icon-sm">
            <FaArrowLeft />
          </p>
          <span className="pop-over-header-title">
            {isEditOpen
              ? editLabel
                ? "Edycja Etykiety"
                : "Dodaj Etykietę"
              : "Etykiety"}
          </span>
        </div>
        {isEditOpen ? (
          editLabel ? (
            <div>
              <form
                className="edit-label"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <label for="labelName">Nazwa</label>
                <input
                  id="labelName"
                  className="js-autofocus js-label-name"
                  onChange={e => this.setText(e, e.target.value)}
                  type="text"
                  name="name"
                  value={this.state.newText}
                />
                <label>Wybierz kolor</label>
                <div>
                  {[
                    "#61bd4f",
                    "#f2d600",
                    "#ffab4a",
                    "#eb5a46",
                    "#c377e0",
                    "#0079bf",
                    "#00c2e0",
                    "#51e898",
                    "#ff80ce",
                    "#4d4d4d"
                  ].map(color => (
                    <span
                      className="card-label mod-edit-label"
                      color={color}
                      style={{ background: color }}
                      onClick={e => this.setColor(e, color)}
                    >
                      {this.state.newColor === color && <FaCheck />}
                    </span>
                  ))}
                </div>
                <div className="u-clearfix">
                  <input
                    className="primary wide"
                    type="submit"
                    value="Zapisz"
                  />
                  <div className="u-float-right">
                    <input
                      type="submit"
                      value="Usuń"
                      onClick={this.handleDelete.bind(this)}
                      className="negate"
                    />
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <form className="edit-label" onSubmit={this.handleAdd.bind(this)}>
                <label for="labelName">Nazwa</label>
                <input
                  id="labelName"
                  className="js-autofocus js-label-name"
                  onChange={e => this.setText(e, e.target.value)}
                  type="text"
                  name="name"
                  value={this.state.newText}
                />
                <label>Wybierz kolor</label>
                <div>
                  {[
                    "#61bd4f",
                    "#f2d600",
                    "#ffab4a",
                    "#eb5a46",
                    "#c377e0",
                    "#0079bf",
                    "#00c2e0",
                    "#51e898",
                    "#ff80ce",
                    "#4d4d4d"
                  ].map(color => (
                    <span
                      className="card-label mod-edit-label"
                      color={color}
                      style={{ background: color }}
                      onClick={e => this.setColor(e, color)}
                    >
                      {this.state.newColor === color && <FaCheck />}
                    </span>
                  ))}
                </div>
                <div className="u-clearfix">
                  <input
                    className="primary wide js-submit"
                    type="submit"
                    value="Utwórz"
                  />
                </div>
              </form>
            </div>
          )
        ) : (
          <div>
            {/* eslint-enable */}
            <input
              type="text"
              placeholder="Szukaj etykiet..."
              autocomplete="off"
            />
            <ul className="edit-labels-pop-over">
              {labels.map(element => (
                <li>
                  <a
                    className="card-label-edit-button icon-sm icon-edit"
                    onClick={e => this.toggleEditOpen(e, element)}
                  >
                    <FaPencilAlt />
                  </a>
                  <span
                    className="card-label mod-selectable"
                    style={{ background: element.color }}
                    key={element.id}
                    onClick={e => this.addLabel(e, element)}
                  >
                    {element.text}
                    {element.cards !== undefined &&
                      element.cards[card.id] !== undefined && (
                        <span className="icon-sm icon-check card-label-selectable-icon light">
                          <FaCheck />
                        </span>
                      )}
                  </span>
                </li>
              ))}
            </ul>
            <div>
              <a
                className="quiet-button"
                onClick={e => this.toggleEditOpen(e, undefined)}
              >
                Utwórz nową etykietę
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddLabel: label => dispatch(startAddLabel(label)),
  startChangeLabelText: (boardId, labelId, labelText) =>
    dispatch(startChangeLabelText(boardId, labelId, labelText)),
  startChangeLabelColor: (boardId, labelId, labelColor) =>
    dispatch(startChangeLabelColor(boardId, labelId, labelColor)),
  startDeleteCardFromLabel: (boardId, labelId, cardId) =>
    dispatch(startDeleteCardFromLabel(boardId, labelId, cardId)),
  startAddCardToLabel: (boardId, labelId, cardId) =>
    dispatch(startAddCardToLabel(boardId, labelId, cardId)),
  startDeleteLabel: (boardId, labelId) =>
    dispatch(startDeleteLabel(boardId, labelId))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Labels);
