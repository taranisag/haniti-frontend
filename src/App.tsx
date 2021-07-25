import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
import firebase from "firebase";
import { app } from "./services/api";
import useItem from "./hooks/useItem";
import useInitialize from "./hooks/useInitialize";
import ItemPopup from "./components/ItemPopup";
import {firebaseConfig} from "./services/login";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const messaging = firebase.messaging();

messaging.getToken({ vapidKey: process.env.REACT_APP_PUSH_KEY_PAIR }).then((currentToken) => {
    if (currentToken) {
        console.log(`currentToken is: ${currentToken}`);
        app.put("/push-token", {pushToken: currentToken}).then((result) => console.log(result));
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});

function App() {
  const { onSvgLoaded } = useInitialize();
  const { onItemClick, showPopup, onClick } = useItem();
  useEffect(() => {
    // login(sucess, error); // TODO: remove only for test
    // app.get("/get-svg").then((result) => console.log(result));
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100hw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactSVG
        src="https://firebasestorage.googleapis.com/v0/b/haniti-3aeed.appspot.com/o/plan.svg?alt=media"
        onClick={onItemClick}
        afterInjection={onSvgLoaded}
      />

      <ItemPopup showPopup={showPopup} onClick={onClick} />
    </div>
  );
}

export default App;
