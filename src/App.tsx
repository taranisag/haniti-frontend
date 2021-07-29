import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import firebase from "firebase";
import useLogin from "./hooks/useLogin";
import useItem from "./hooks/useItem";
import useInitialize from "./hooks/useInitialize";
import ItemPopup from "./components/ItemPopup";
import { firebaseConfig } from "./services/firebase";
import { api } from "./services/api";

const Body = styled.div`
  width: 100vw;
  height: 100hw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// @ts-ignore
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

function iOS() {
  return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

if (!isSafari && !iOS()) {
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
}


function App() {
  const [loaded, setLoaded] = useState(false);
  const [event, setEvent] = useState();
  const [user, login] = useLogin();
  const { onSvgLoaded, setSvgIsReady } = useInitialize(setLoaded);
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
    <>
      {!loaded && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      )}
      <Body>
        {show && (
          <ReactSVG
            src="https://firebasestorage.googleapis.com/v0/b/haniti-3aeed.appspot.com/o/plan-test.svg?alt=media"
            onClick={onItemClick}
            afterInjection={onSvgLoaded}
          />
        )}

        <ItemPopup showPopup={showPopup} onClick={onClick} />
      </Body>
    </>
  );
}

export default App;
