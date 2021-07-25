import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
import { login } from "./services/login";
import { app } from "./services/api";
import useItem from "./hooks/useItem";
import useInitialize from "./hooks/useInitialize";
import ItemPopup from "./components/ItemPopup";
import plan from "./plan.svg";

const sucess = (result: any) => {
  app.setToken(result.credential.accessToken);
  console.log(result);
};
const error = (result: any) => {
  console.error(result);
};

function App() {
  const { onSvgLoaded } = useInitialize();
  const { onItemClick, showPopup, onClick } = useItem();
  useEffect(() => {
    login(sucess, error); // TODO: remove only for test
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
