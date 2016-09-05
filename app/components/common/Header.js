"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import Login from "./Login";
import Logout from "./Logout";
import UploadModal from "./UploadModal";
import FontAwesome from "react-fontawesome";
import toastr from "toastr";
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { loginUser, logoutUser, saveTrack } from "../../actions/clypActions";

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.saveTrack = this.saveTrack.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  saveTrack(track) {
    return new Promise((resolve, reject) => {
      this.props.dispatch(saveTrack(track))
        .then(() => {
          toastr.success("File uploaded successfully!");
          resolve();
        })
        .catch((err) => {
          toastr.error(err);
        });
    });
  }

  onLoginClick(creds) {
    this.props.dispatch(loginUser(creds))
      .then(() => {
        if (this.props.errorMessage) {
          toastr.error(this.props.errorMessage);
        }
      })
      .catch((err) => {
        toastr.error(err);
      });
  }

  onLogoutClick() {
    this.props.dispatch(logoutUser());
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="container-fluid fixed-elements">
        <header id="clyp-header">
          <div className="fixed-header row">
            <Link to="https://clyp.it" target="_blank" className="clyp-logo-wrapper">
              <img src="/public/images/logos/clyp-logo-primary-98x44.svg" className="clyp-logo" alt="Clyp logo"/>
            </Link>
            <div className="nav-actions">
              <div className="nav-action">
                <UploadModal
                  onDrop={this.saveTrack}
                  bsStyle="primary"
                  bsSize="small"
                />
              </div>
              <div className="nav-action">
                <FontAwesome
                  name="random"
                  size="2x"
                />
              </div>
              <div className="nav-action">
                <FontAwesome
                  name="volume-up"
                  size="3x"
                />
              </div>
              <div className="nav-action">
                <FontAwesome
                  name="bell-o"
                  size="2x"
                />
              </div>
              <div className="nav-action">
                {!isAuthenticated &&
                  <Login
                    onLoginClick={this.onLoginClick}
                  />
                }
                {isAuthenticated &&
                  <Logout
                    onLogoutClick={this.onLogoutClick}
                  />
                }
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};


export default Header;
