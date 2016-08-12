"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import UploadModal from "./UploadModal";
import FontAwesome from "react-fontawesome";
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      authenticated: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.lock.show((err, profile, token) => {
      if (err) {
        alert(err);
        return;
      }
      this.setState({ authenticated: true });
    });
  }

  logout() {
    this.setState({ authenticated: false });
  }

  render() {
    return (
      <div className="fixed-elements">
        <header id="clyp-header">
          <div className="fixed-header">
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="https://clyp.it" target="_blank" className="clyp-logo-wrapper">
                    <img src="/public/img/logo/clyp-logo-primary-98x44.svg" className="clyp-logo" alt="Clyp logo"/>
                  </Link>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem>
                  <UploadModal
                    onDrop={this.props.onDrop}
                    bsStyle="primary"
                    bsSize="small"
                  />
                </NavItem>
                <NavItem>
                  <FontAwesome
                    name="random"
                    size="2x"
                  />
                </NavItem>
                <NavItem>
                  <FontAwesome
                    name="volume-up"
                    size="3x"
                  />
                </NavItem>
                <NavItem>Login</NavItem>
              </Nav>
            </Navbar>
          </div>
        </header>
      </div>
    );
  }
}


Header.propTypes = {
  onDrop: PropTypes.func.isRequired,
  lock: PropTypes.object.isRequired
};


export default Header;