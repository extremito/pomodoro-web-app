import React, { ChangeEventHandler } from "react";
import PropTypes from "prop-types";

interface INumberInput {
  id: string;
  labelText: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  disabled?: boolean;
}

const NumberInput = ({
  id,
  labelText,
  onChange,
  value,
  disabled = false,
}: INumberInput) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        className="form-control"
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </>
  );
};

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default NumberInput;
