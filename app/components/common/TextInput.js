"use strict";

import React, { PropTypes } from "react";

const TextInput = ({ name, label, onChange, defaultValue, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input type="text"
               name={name}
               className="form-control"
               defaultValue={defaultValue}
               value={value}
               onChange={onChange} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
