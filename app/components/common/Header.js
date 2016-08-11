"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import UploadModal from "./UploadModal";
import FontAwesome from "react-fontawesome";

const Header = ({ onDrop }) => {
  return (
    <div className="fixed-elements row">
      <header id="clyp-header">
        <div className="fixed-header">
          <Link to="https://clyp.it" target="_blank" className="clyp-logo-wrapper">
            <img src="/public/img/logo/clyp-logo-primary-98x44.svg" className="clyp-logo" alt="Clyp logo"/>
          </Link>
          <div className="nav-actions">
            <UploadModal
              onDrop={onDrop}
              bsStyle="primary"
              bsSize="small"
            />
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
          </div>
        </div>
      </header>
    </div>
  );
};


Header.propTypes = {
  onDrop: PropTypes.func.isRequired
};


export default Header;
