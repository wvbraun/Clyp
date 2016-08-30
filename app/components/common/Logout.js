"use strict";

import React, { PropTypes } from "react";
import { Button } from "react-bootstrap";

const Logout = ({ onLogoutClick }) => {
  return (
    <Button onClick={onLogoutClick}>
      LOG OUT
    </Button>
  );
};

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
};

export default Logout;
