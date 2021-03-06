import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import { FaCheck } from "react-icons/fa";
import colorIcon from "../assets/images/color-icon.png";
import classnames from "classnames";
import { startChangeBoardColor } from "../actions/Board";

class ColorPicker extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    boardColor: PropTypes.string.isRequired
  };

  handleSelection = color => {
    const { boardId, boardColor } = this.props;
    // Dispatch update only if selected color is not the same as current board color.
    if (color !== boardColor) {
      this.props.startChangeBoardColor(boardId, color);
    }
  };

  render() {
    const { boardColor } = this.props;
    const colors = ["blue", "green", "red", "pink"];
    return (
      <Wrapper
        className="color-picker-wrapper"
        onSelection={this.handleSelection}
      >
        <Button className="color-picker">
          <img src={colorIcon} alt="colorwheel" className="modal-icon" />
          <div className="board-header-right-text">
            &nbsp;Color &nbsp;&#9662;
          </div>
        </Button>
        <Menu className="color-picker-menu">
          {colors.map(color => (
            <MenuItem
              value={color}
              className={classnames("color-picker-item", color)}
              key={color}
            >
              {color === boardColor && <FaCheck />}
            </MenuItem>
          ))}
        </Menu>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardColor: state.Board[boardId].color,
    boardId
  };
};

const mapDispatchToProps = dispatch => ({
  startChangeBoardColor: (boardId, color) =>
    dispatch(startChangeBoardColor(boardId, color))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColorPicker)
);
