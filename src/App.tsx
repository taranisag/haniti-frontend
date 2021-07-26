import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import firebase from "firebase";
import useLogin from "./hooks/useLogin";
import useItem from "./hooks/useItem";
import useInitialize from "./hooks/useInitialize";
import ItemPopup from "./components/ItemPopup";
import { firebaseConfig } from "./services/firebase";
import { api } from "./services/api";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const messaging = firebase.messaging();

messaging
  .getToken({ vapidKey: process.env.REACT_APP_PUSH_KEY_PAIR })
  .then((currentToken) => {
    if (currentToken) {
      console.log(`currentToken is: ${currentToken}`);
      api
        .put(`/push-token/${currentToken}`)
        .then((result) => console.log(result));
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

function App() {
  const [event, setEvent] = useState();
  const [user, login] = useLogin();
  const { onSvgLoaded, setSvgIsReady } = useInitialize();
  const { onItemClick, showPopup, onClick } = useItem(
    user,
    login,
    setEvent,
    setSvgIsReady
  );
  const show = !event && (user || !user);

  useEffect(() => {
    if (user && event) {
      setEvent(undefined);
      setSvgIsReady(true);
      setTimeout(() => {
        onItemClick(event);
      }, 1000);
    }
  }, [event, user, onItemClick, setSvgIsReady]);

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
      {show && (
        <ReactSVG
          src="https://firebasestorage.googleapis.com/v0/b/haniti-3aeed.appspot.com/o/plan.svg?alt=media"
          onClick={onItemClick}
          afterInjection={onSvgLoaded}
        />
      )}

      <ItemPopup showPopup={showPopup} onClick={onClick} />
    </div>
  );
}

export default App;
