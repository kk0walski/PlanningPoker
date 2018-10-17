import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import { startChangeCardDate } from "../actions/Cards";

class Calendar extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cardId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    toggleCalendar: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: props.date ? new Date(props.date) : undefined
    };
  }

  handleDayClick = (selectedDay, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay });
  };

  handleSave = () => {
    const { selectedDay } = this.state;
    const { cardId, boardId, toggleCalendar } = this.props;
    this.props.startChangeCardDate(boardId, cardId, selectedDay);
    toggleCalendar();
  };

  render() {
    const { selectedDay } = this.state;
    const { toggleCalendar } = this.props;
    return (
      <div className="calendar">
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={selectedDay}
          disabledDays={{ before: new Date() }}
        />
        <div className="calendar-buttons">
          <button onClick={this.handleSave} className="calendar-save-button">
            Save
          </button>
          <button onClick={toggleCalendar}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startChangeCardDate: (boardId, cardId, newDate) =>
    dispatch(startChangeCardDate(boardId, cardId, newDate))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Calendar);
