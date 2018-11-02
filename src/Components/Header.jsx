import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { FaUserSecret } from "react-icons/fa";
import { Button, Wrapper, Menu, MenuItem } from "react-aria-menubutton";
import kanbanLogo from "../assets/images/kanban-logo.svg";
import { firebase } from "../firebase/firebase";

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleLogOut = () => {
    const { dispatch } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOG_OUT" });
      });
  };

  render = () => {
    const { user } = this.props;
    return (
      <div className="header">
        <Link to="/" className="header-title">
          <img src={kanbanLogo} alt="Planning Poker logo" />
          &nbsp;Planning Poker
        </Link>
        <div className="header-right-side">
          <Wrapper className="header-wrapper" onSelection={this.handleLogOut}>
            <Button className={classnames("header-btn", "header-avatar")}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="user-icon"
                  title={user.name}
                />
              ) : (
                <FaUserSecret className="user-thumbnail" />
              )}
            </Button>
            <Menu className="header-menu">
              <div className="pop-over-header">{user.email}</div>
              <div className="pop-over-content">
                <Link className="pop-over-menu" to={"/profile"}>
                  Profil
                </Link>
                <Link className="pop-over-menu" to={"/organisation"}>
                  Organisations
                </Link>
                <MenuItem className="pop-over-menu">Wyloguj</MenuItem>
              </div>
            </Menu>
          </Wrapper>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
