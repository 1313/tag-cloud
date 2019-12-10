import React from "react";
import StatusLight, { LightColor } from "./StatusLight";

import { ConnectionInfo } from "../types/connection-info";
import { ProfunctorProps } from "../types/profunctor-props";
import { ConnectionStatus } from "common/types/connection-status";

export function ConnectionInfo({
  prof,
}: ProfunctorProps<ConnectionInfo>): JSX.Element {
  const [color, text] = (() => {
    if (prof.state.error) {
      return [LightColor.Red, prof.state.error];
    }
    switch (prof.state.status) {
      case ConnectionStatus.Connecting:
        return [LightColor.Yellow, "Connecting"];
      case ConnectionStatus.Connected:
        return [LightColor.Green, "Connected"];
      case ConnectionStatus.Disconnected:
        return [LightColor.Blue, "Idle"];
    }
  })();

  return (
    <div className="connection-info stack-h">
      <StatusLight color={color} />
      <span>{text}</span>
    </div>
  );
}
