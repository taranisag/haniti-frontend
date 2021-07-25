import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import useLogin from "./hooks/useLogin";
import useItem from "./hooks/useItem";
import useInitialize from "./hooks/useInitialize";
import ItemPopup from "./components/ItemPopup";

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
  }, [event, user]);

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
