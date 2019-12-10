import React from "react";

import { InputProps } from "../types/input-props";

export default function TextInput({
  prof,
  label,
  disabled,
}: InputProps<string>) {
  return (
    <label>
      <span>{label}</span>
      <input
        disabled={disabled}
        type="text"
        onChange={e => {
          const value = e.target.value;
          prof.setState(() => value);
        }}
        value={prof.state}
      />
    </label>
  );
}
