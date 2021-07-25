import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
import { login } from "./services/login";
import logo from "./parking_test.svg";
import "./App.css";

const sucess = (result: any) => {
  console.log("result", result);
};
const error = (result: any) => {
  console.log("result", result);
};

function App() {
  useEffect(() => {
    login(sucess, error);
  }, []);
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
