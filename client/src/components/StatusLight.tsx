import React from "react";

export const LightColor = {
  Red: "red",
  Yellow: "yellow",
  Blue: "blue",
  Green: "green",
};

interface StatusLightProps {
  color: typeof LightColor[keyof typeof LightColor];
}
export default function StatusLight({ color }: StatusLightProps) {
  return <div key={color} className={`led ${color}`}></div>;
}
