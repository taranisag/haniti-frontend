import React from "react";
import { ReactSVG } from "react-svg";
import useItem from "./hooks/useItem";
import useInitialize from "./hooks/useInitialize";
import ItemPopup from "./components/ItemPopup";
import plan from "./plan.svg";

// svg5

function App() {
  useInitialize();
  const { onItemClick, itemPopupRef } = useItem();

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
      <ReactSVG src={plan} onClick={onItemClick} />
      <ItemPopup itemPopupRef={itemPopupRef} />
    </div>
  );
}

export default App;
