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
    labels: PropTypes.arrayOf(PropTypes.object).isRequired,
    card: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.toggleEditOpen = this.toggleEditOpen.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { labels, card, cards } = this.props;
    const { isEditOpen, editLabel } = this.state;
    console.log(cards);
    if (isEditOpen) {
      if (editLabel) {
        return (
          <div className="modal-color-picker" onKeyDown={this.handleKeyDown}>
            <div className="pop-over-header js-pop-over-header">
              <button
                onClick={e => this.toggleEditOpen(e, undefined)}
                className="pop-over-header-back-btn icon-sm"
              >
                <FaArrowLeft />
              </button>
              <span className="pop-over-header-title">Edyjca etykiety</span>
            </div>
            <div>
              <form
                className="edit-label"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <label htmlFor="labelName">Nazwa</label>
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
                      key={color}
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
          </div>
        );
      } else {
        return (
          <div className="modal-color-picker" onKeyDown={this.handleKeyDown}>
            <div className="pop-over-header js-pop-over-header">
              <button
                onClick={e => this.toggleEditOpen(e, undefined)}
                className="pop-over-header-back-btn icon-sm"
              >
                <FaArrowLeft />
              </button>
              <span className="pop-over-header-title">Dodaj etykiete</span>
            </div>
            <div>
              <form className="edit-label" onSubmit={this.handleAdd.bind(this)}>
                <label htmlFor="labelName">Nazwa</label>
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
                      key={color}
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
          </div>
        );
      }
    } else {
      return (
        <div className="modal-color-picker" onKeyDown={this.handleKeyDown}>
          <div className="pop-over-header js-pop-over-header">
            <span className="pop-over-header-title">Etykiety</span>
          </div>
          <div>
            {/* eslint-enable */}
            <input
              type="text"
              placeholder="Szukaj etykiet..."
              autoComplete="off"
            />
            <ul className="edit-labels-pop-over">
              {labels.map(element => (
                <li key={element.id}>
                  <button
                    className="card-label-edit-button icon-sm icon-edit"
                    onClick={e => this.toggleEditOpen(e, element)}
                  >
                    <FaPencilAlt />
                  </button>
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
              <button
                className="quiet-button"
                onClick={e => this.toggleEditOpen(e, undefined)}
              >
                Utwórz nową etykietę
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    boardId: ownProps.boardId,
    labels: ownProps.labels,
    card: ownProps.card
  };
};

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
  mapStateToProps,
  mapDispatchToProps
)(Labels);
