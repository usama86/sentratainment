import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

function TextFieldComponent({ Label, variant, value, onChange, ...otherProps }) {
  return (
    <TextField
      id="outlined-basic"
      value={value}
      onChange={onChange}
      label={Label}
      variant={variant ? variant : 'outlined'}
      {...otherProps}
    />
  );
}

TextFieldComponent.propTypes = {
  Label: PropTypes.string,
  variant: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextFieldComponent.defaultProps = {
  variant: 'outlined'
};

export default TextFieldComponent;
