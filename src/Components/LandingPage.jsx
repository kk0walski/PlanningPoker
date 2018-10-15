import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FaGithub } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import kanbanLogo from "../assets/images/kanban-logo.svg";
import { firebase } from "../firebase/firebase";
import { enterAsUser } from "../actions/User";

class LandingPage extends React.Component {
  enterAsGuest = () => {
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.props.enterAsUser(firebaseUser);
      }
    });
  };

  handleSocialLogin = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        if (user) {
          this.props.enterAsUser(user);
        }
      });
  };

  handleSocialLoginFailure = err => {
    console.error(err);
  };

  render = () => {
    return (
      <div className="landing-page">
        <Helmet>
          <title>Sign in | Planning Poker</title>
        </Helmet>
        <div className="landing-page-info-wrapper">
          <div className="landing-page-info">
            <div className="landing-page-heading">
              <img
                src={kanbanLogo}
                alt="Planning Poker Logo"
                className="landing-page-logo"
              />
              &nbsp;
              <h1>Planning Poker</h1>
            </div>
            <p className="landing-page-description">
              Planning Poker Game - an open source project for helping teams
              estimating the complexity of project tasks.
              <br />
              Created during the course at the Wrocław University of Science and
              Technology © 2018.
              <br />
              <a href="http://teamestimation.pl">teamestimation.pl</a>
              <br />
            </p>
            <div className="signin-buttons">
              <div>
                <button
                  onClick={this.handleSocialLogin}
                  className="signin-button guest-button"
                >
                  <FaGithub className="logo-icon" /> &nbsp;Sign in with Github
                </button>
              </div>
              <div className="guest-button-wrapper">
                <button
                  onClick={this.enterAsGuest}
                  className="signin-button guest-button"
                >
                  <FaUserSecret className="logo-icon" /> &nbsp;Enter as guest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  enterAsUser: user => dispatch(enterAsUser(user))
});

export default connect(
  undefined,
  mapDispatchToProps
)(LandingPage);
