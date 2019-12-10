import React from "react";
import { InputProps } from "../types/input-props";

export function SwitchButton({ prof, disabled, label }: InputProps<boolean>) {
  return (
    <button
      disabled={disabled}
      onClick={() => prof.setState(() => !prof.state)}
      type="button"
    >
      {label}
    </button>
  );
}
