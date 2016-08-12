"use strict";

import React, { PropTypes } from "react";
import Input from "./TextInput";

const LoginForm = ({ user, onChange }) => {
  return (
    <form>
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
    </form>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LoginForm;
