import { useRef, useState, useEffect, useCallback } from "react";
import { toggleColorById } from "../services/svg";

export declare type PopupActions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export default () => {
  const itemPopupRef = useRef<PopupActions>();
  const [showPopup, setShowPopup] = useState<string | false>(false);

  const onItemClick = useCallback(
    (e) => {
      const id: string = e?.target?.id || "";
      const arr = id.split("_");
      const lastElement = arr[arr.length];
      // console.log(arr, id);

      if (arr.length > 1) {
        toggleColorById(id);
      }
    },
    [itemPopupRef]
  );

  return { itemPopupRef, showPopup, onItemClick };
};
