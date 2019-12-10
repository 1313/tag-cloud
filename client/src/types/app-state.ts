import { ConnectionInfo } from "./connection-info";
import { SettingsFormData } from "./settings-form-data";
import { WordTuple } from "common/types/word-tuple";

export interface AppState {
  debug: { visible: false };
  connection: ConnectionInfo;
  words: WordTuple[];
  form: SettingsFormData;
}
