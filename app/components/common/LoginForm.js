"use strict";

import React, { PropTypes } from "react";
import { Button } from "react-bootstrap";
import Input from "./TextInput";

const LoginForm = ({ user, onChange, onClick }) => {
  return (
    <form>
      <div className="form-group">
        <Input
          name="email"
          label="Email Address"
          value={user.email}
          onChange={onChange}
        />
        <Input
          name="password"
          label="Password"
          value={user.password}
          onChange={onChange}
        />
      </div>
      <Button type="submit" onClick={onClick}>Login</Button>
    </form>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default LoginForm;
