import React, { ChangeEventHandler, MouseEventHandler } from "react";

interface INumberInput {
  id: string;
  labelText: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

const NumberInput = ({id, labelText, onChange, value }: INumberInput) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        className="form-control"
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default NumberInput;
