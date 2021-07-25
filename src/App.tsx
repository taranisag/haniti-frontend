import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
import { login } from "./services/login";
import logo from "./parking_test.svg";
import "./App.css";
import { app } from "./services/api";

const sucess = (result: any) => {
  app.setToken(result.credential.accessToken);
  console.log(result);
};
const error = (result: any) => {
  console.error(result);
};

function App() {
  useEffect(() => {
    // login(sucess, error); // TODO: remove only for test
    app.get("/get-svg").then((result) => console.log(result));
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
