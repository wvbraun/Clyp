"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
//import LoginModal from "./LoginModal";
import Login from "./Login";
import UploadModal from "./UploadModal";
import FontAwesome from "react-fontawesome";
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import * as clypActions from "../../actions/clypActions";


class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      authenticated: false
    };
  }

  render() {
    return (
      <div className="fixed-elements row">
        <header id="clyp-header">
          <div className="fixed-header">
            <Link to="https://clyp.it" target="_blank" className="clyp-logo-wrapper">
              <img src="/public/img/logo/clyp-logo-primary-98x44.svg" className="clyp-logo" alt="Clyp logo"/>
            </Link>
            <div className="nav-actions">
              <div className="nav-action">
                <UploadModal
                  onDrop={this.props.onDrop}
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
                <Login />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  onDrop: PropTypes.func.isRequired
};


export default Header;
