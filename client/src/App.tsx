import React from "react";

import "./App.css";
const alpha = "123456789abcdefghijklmnopqrst";
const App: React.FC = () => {
  return (
    <div className="cloud">
      {`. . . . . . . . . . . . . . . . . `.split(" ").map((s, index) => (
        <span style={{ gridArea: "a" + alpha.charAt(index) }}>{s}</span>
      ))}
    </div>
  );
};

export default App;
