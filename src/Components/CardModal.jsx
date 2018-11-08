import React, { Component } from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import Modal from "react-modal";
import CardBadges from "./CardBadges";
import { startChangeCardTitle } from "../actions/Cards";
import CardOptions from "./CardOptions";

class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newText: props.card.title,
      isColorPickerOpen: false,
      isLabelPickerOpen: false,
      isTextareaFocused: true
    };
    if (typeof document !== "undefined") {
      Modal.setAppElement("#app");
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ newText: nextProps.card.title });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.submitCard();
    }
  };

  submitCard = () => {
    const { newText } = this.state;
    const { card, boardId, toggleCardEditor } = this.props;
    if (newText === "") {
      this.deleteCard();
    } else if (newText !== card.content) {
      this.props.startChangeCardTitle(boardId, card.id, newText);
    }
    toggleCardEditor();
  };

  handleChange = event => {
    this.setState({ newText: event.target.value });
  };

  toggleColorPicker = () => {
    this.setState({ isColorPickerOpen: !this.state.isColorPickerOpen });
  };

  toggleLabelPicker = () => {
    this.setState({ isLabelPickerOpen: !this.state.isLabelPickerOpen });
  };

  handleRequestClose = () => {
    const { isColorPickerOpen } = this.state;
    const { toggleCardEditor } = this.props;
    if (!isColorPickerOpen) {
      toggleCardEditor();
    }
  };

  render() {
    const {
      newText,
      isColorPickerOpen,
      isLabelPickerOpen,
      isTextareaFocused
    } = this.state;
    const {
      cardElement,
      card,
      listId,
      boardId,
      checkboxes,
      labels,
      isOpen
    } = this.props;
    if (!cardElement) {
      return null;
    }

    /*
    Create style of modal in order to not clip outside the edges no matter what device.
    */

    // Get dimensions of the card to calculate dimensions of cardModal.
    const boundingRect = cardElement.getBoundingClientRect();

    // Returns true if card is closer to right border than to the left
    const isCardNearRightBorder =
      window.innerWidth - boundingRect.right < boundingRect.left;

    // Check if the display is so thin that we need to trigger a centered, vertical layout
    // DO NOT CHANGE the number 550 without also changing related media-query in CardOptions.scss
    const isThinDisplay = window.innerWidth < 550;

    // Position textarea at the same place as the card and position everything else away from closest edge
    const style = {
      content: {
        top: Math.min(
          boundingRect.top,
          window.innerHeight - boundingRect.height - 18
        ),
        left: isCardNearRightBorder ? null : boundingRect.left,
        right: isCardNearRightBorder
          ? window.innerWidth - boundingRect.right
          : null,
        flexDirection: isCardNearRightBorder ? "row-reverse" : "row"
      }
    };

    // For layouts that are less wide than 550px, let the modal take up the entire width at the top of the screen
    const mobileStyle = {
      content: {
        flexDirection: "column",
        top: 3,
        left: 3,
        right: 3
      }
    };

    return (
      <Modal
        closeTimeoutMS={150}
        isOpen={isOpen}
        onRequestClose={this.handleRequestClose}
        contentLabel="Card editor"
        overlayClassName="modal-underlay"
        className="modal"
        style={isThinDisplay ? mobileStyle : style}
        includeDefaultStyles={false}
        onClick={this.handleRequestClose}
      >
        <div
          className="modal-textarea-wrapper"
          style={{
            minHeight: isThinDisplay
              ? "none"
              : Math.min(boundingRect.height, window.innerHeight),
            width: isThinDisplay ? "100%" : boundingRect.width,
            boxShadow: isTextareaFocused
              ? "0px 0px 3px 2px rgb(0, 180, 255)"
              : null,
            background: card.color
          }}
        >
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            value={newText}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            className="modal-textarea"
            spellCheck={false}
            style={{ maxHeight: window.innerHeight - 30 }}
            onFocus={() => this.setState({ isTextareaFocused: true })}
            onBlur={() => this.setState({ isTextareaFocused: false })}
          />
          {card.date && (
            <CardBadges
              date={
                card.date.seconds
                  ? new Date(card.date.seconds * 1000)
                  : card.date
              }
              checkboxes={checkboxes}
            />
          )}
        </div>
        <CardOptions
          isColorPickerOpen={isColorPickerOpen}
          isLabelPickerOpen={isLabelPickerOpen}
          card={card}
          listId={listId}
          labels={labels}
          boardId={boardId}
          boundingRect={boundingRect}
          isCardNearRightBorder={isCardNearRightBorder}
          isThinDisplay={isThinDisplay}
          toggleColorPicker={this.toggleColorPicker}
          toggleLabelPicker={this.toggleLabelPicker}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  boardId: ownProps.boardId,
  card: ownProps.card,
  listId: ownProps.listId,
  isOpen: ownProps.isOpen
});

const mapDispatchToProps = dispatch => ({
  startChangeCardTitle: (boardId, cardId, cardTitle) =>
    dispatch(startChangeCardTitle(boardId, cardId, cardTitle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardModal);
