import React from "react";
import { FiTwitter } from "react-icons/fi";

import TextInput from "./TextInput";
import { lensProp } from "../utils/data";
import { ProfunctorProps } from "../types/profunctor-props";

import { SettingsFormData } from "../types/settings-form-data";
import { SwitchButton } from "./SwitchButton";
import { useAppState } from "../hooks/useAppState";

export default function SettingsForm({
  prof,
}: ProfunctorProps<SettingsFormData>) {
  const appStateProf = useAppState();

  const searchProf = appStateProf
    .promap(lensProp("form"))
    .promap(lensProp("search"));
  const activeProof = prof.promap(lensProp("active"));
  return (
    <div className="fieldset stack-h">
      <TextInput
        disabled={activeProof.state}
        label="hashtag:"
        prof={searchProf}
      />
      <SwitchButton
        label={activeProof.state ? "Stop" : "Start"}
        disabled={searchProf.state.length <= 2}
        prof={activeProof}
      />
    </div>
  );
}
