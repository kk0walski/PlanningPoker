import React from "react";
import onClickOutside from "react-onclickoutside";

// Wrap component in this component to handle click outisde of that component
class ClickOutsideWrapper extends React.Component {
  handleClickOutside = () => this.props.handleClickOutside();
  render = () => this.props.children;
}

export default onClickOutside(ClickOutsideWrapper);
