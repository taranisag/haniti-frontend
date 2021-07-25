import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
import firebase from "firebase";
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

const messaging = firebase.messaging();

messaging.getToken({ vapidKey: process.env.REACT_APP_PUSH_KEY_PAIR }).then((currentToken) => {
    if (currentToken) {
        app.put("/push-token", {pushToken: currentToken}).then((result) => console.log(result));
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});

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
