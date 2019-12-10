import React from "react";

import WordCloud from "./components/WordCloud";
import DebugInfo from "./components/DebugInfo";
import SettingsForm from "./components/SettingsForm";
import Footer from "./components/Footer";

import { lensProp } from "./utils/data";
import { ConnectionInfo } from "./components/ConnectionInfo";
import { useAppState } from "./hooks/useAppState";
import { useWords } from "./hooks/useWords";
import { useConnectionStatus } from "./hooks/useConnectionStatus";
import { useListenForErrors } from "./hooks/useListenForErrors";

const App: React.FC = (): JSX.Element => {
  const appStateProf = useAppState();
  useWords(appStateProf);
  useConnectionStatus(appStateProf);
  useListenForErrors(appStateProf);

  return (
    <main className="stack-v">
      <div className="distribute-h">
        <ConnectionInfo prof={appStateProf.promap(lensProp("connection"))} />
        <DebugInfo prof={appStateProf} />
      </div>

      <div className="card">
        <h2>Tag cloud by: Per Johansson</h2>
        <hr />
        <SettingsForm prof={appStateProf.promap(lensProp("form"))} />
      </div>
      <WordCloud prof={appStateProf} />
      <Footer />
    </main>
  );
};

export default App;
