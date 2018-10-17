import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { FaArchive } from "react-icons/fa";
import { MdAccessAlarm } from "react-icons/md";
import Calendar from "./Calendar";
import ClickOutside from "./ClickOutside";
import colorIcon from "../assets/images/color-icon.png";
import { startChangeCardColor, startArchiveCard } from "../actions/Cards";

class CardOptions extends Component {
  static propTypes = {
    isColorPickerOpen: PropTypes.bool.isRequired,
    card: PropTypes.object.isRequired,
    listId: PropTypes.string.isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    isThinDisplay: PropTypes.bool.isRequired,
    boundingRect: PropTypes.object.isRequired,
    toggleColorPicker: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { isCalendarOpen: false };
  }

  deleteCard = () => {
    const { boardId, card } = this.props;
    this.props.startArchiveCard(boardId, card.id);
  };

  changeColor = color => {
    const { card, boardId, toggleColorPicker } = this.props;
    if (card.color !== color) {
      this.props.startChangeCardColor(boardId, card.id, color);
    }
    toggleColorPicker();
    this.colorPickerButton.focus();
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.toggleColorPicker();
      this.colorPickerButton.focus();
    }
  };

  handleClickOutside = () => {
    const { toggleColorPicker } = this.props;
    toggleColorPicker();
    this.colorPickerButton.focus();
  };

  toggleCalendar = () => {
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
  };

  render() {
    const {
      isCardNearRightBorder,
      isColorPickerOpen,
      toggleColorPicker,
      card,
      boardId,
      isThinDisplay,
      boundingRect
    } = this.props;
    const { isCalendarOpen } = this.state;

    const calendarStyle = {
      content: {
        top: Math.min(boundingRect.bottom + 10, window.innerHeight - 300),
        left: boundingRect.left
      }
    };

    const calendarMobileStyle = {
      content: {
        top: 110,
        left: "50%",
        transform: "translateX(-50%)"
      }
    };
    return (
      <div
        className="options-list"
        style={{
          alignItems: isCardNearRightBorder ? "flex-end" : "flex-start"
        }}
      >
        <div>
          <button onClick={this.deleteCard} className="options-list-button">
            <div className="modal-icon">
              <FaArchive />
            </div>
            &nbsp;Archive
          </button>
        </div>
        <div className="modal-color-picker-wrapper">
          <button
            className="options-list-button"
            onClick={toggleColorPicker}
            onKeyDown={this.handleKeyDown}
            ref={ref => {
              this.colorPickerButton = ref;
            }}
            aria-haspopup
            aria-expanded={isColorPickerOpen}
          >
            <img src={colorIcon} alt="colorwheel" className="modal-icon" />
            &nbsp;Color
          </button>
          {isColorPickerOpen && (
            <ClickOutside
              eventTypes="click"
              handleClickOutside={this.handleClickOutside}
            >
              {/* eslint-disable */}
              <div
                className="modal-color-picker"
                onKeyDown={this.handleKeyDown}
              >
                {/* eslint-enable */}
                {["white", "#6df", "#6f6", "#ff6", "#fa4", "#f66"].map(
                  color => (
                    <button
                      key={color}
                      style={{ background: color }}
                      className="color-picker-color"
                      onClick={() => this.changeColor(color)}
                    />
                  )
                )}
              </div>
            </ClickOutside>
          )}
        </div>
        <div>
          <button onClick={this.toggleCalendar} className="options-list-button">
            <div className="modal-icon">
              <MdAccessAlarm />
            </div>
            &nbsp;Due date
          </button>
        </div>
        <Modal
          isOpen={isCalendarOpen}
          onRequestClose={this.toggleCalendar}
          overlayClassName="calendar-underlay"
          className="calendar-modal"
          style={isThinDisplay ? calendarMobileStyle : calendarStyle}
        >
          <Calendar
            cardId={card.id}
            date={card.date}
            boardId={boardId}
            toggleCalendar={this.toggleCalendar}
          />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startChangeCardColor: (boardId, cardId, color) =>
    dispatch(startChangeCardColor(boardId, cardId, color)),
  startArchiveCard: (boardId, cardId) =>
    dispatch(startArchiveCard(boardId, cardId))
});

export default connect(
  undefined,
  mapDispatchToProps
)(CardOptions);
