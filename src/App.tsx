import React from "react";
import { ReactSVG } from "react-svg";
import logo from "./parking_test.svg";
import "./App.css";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactSVG src={logo} onClick={(e) => console.log(e)} />
    </div>
  );
}

export default App;
