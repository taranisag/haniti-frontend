import { useState, useCallback, useEffect } from "react";
import { api } from "../services/api";
import * as svg from "../services/svg";
import {
  TOP_PREFIX_SVG,
  BOTTOM_PREFIX_SVG,
  SINGLE_PREFIX_SVG,
  DELIMITER_ID,
  BUSY_ITEM_COLOR,
  ITEM_STATUS_BUSY,
  FREE_ITEM_COLOR,
  ITEM_STATUS_FREE,
} from "../utils/const";

export type ShowPopupType =
  | { topId: string; bottomId: string; fallback: string | undefined }
  | false;

export default (user: any, login: any, setEvent: any, setSvgIsReady: any) => {
  const [showPopup, setShowPopup] = useState<ShowPopupType>(false);

  const patch = useCallback(
    (id) => {
      const uid = user?.uid;
      const el = svg.getElementById(id);

      svg.setMineAttrByElement(svg.toggleColorById(el));

      const color = svg.getFillColorByElement(el);

      if (uid) {
        api.patch(
          "https://haniti-3aeed-default-rtdb.europe-west1.firebasedatabase.app/parkings.json",
          {
            [id]: {
              userId: uid,
              status:
                color === FREE_ITEM_COLOR ? ITEM_STATUS_FREE : ITEM_STATUS_BUSY,
            },
          }
        );
      }
    },
    [user]
  );

  const onItemClick = useCallback(
    (e) => {
      const id: string = e?.target?.id;
      const arr = (id || "").split(DELIMITER_ID);

      if (arr?.[0] !== "taranis") {
        return;
      }

      if (!user) {
        setSvgIsReady(false);
        setEvent(e);

        return login();
      }

      const lastElementIndex = arr.length - 1;
      const idsElements = arr.slice(0, lastElementIndex);
      const topId = `${idsElements.join(
        DELIMITER_ID
      )}${DELIMITER_ID}${TOP_PREFIX_SVG}`;
      const bottomId = `${idsElements.join(
        DELIMITER_ID
      )}${DELIMITER_ID}${BOTTOM_PREFIX_SVG}`;
      const mineItem = svg.getMineItem();
      const elTop = svg.getElementById(topId);
      const elBottom = svg.getElementById(bottomId);
      const onlyOneItem =
        arr[lastElementIndex] === SINGLE_PREFIX_SVG || !elTop || !elBottom;

      if (mineItem) {
        const mineId = mineItem.id;

        patch(mineId);

        if (mineId === id || mineId === topId || mineId === bottomId) {
          return;
        }
      }

      if (onlyOneItem) {
        return patch(id);
      }

      const isTopBusy = svg.getFillColorByElement(elTop) === BUSY_ITEM_COLOR;
      const isBottomBusy =
        svg.getFillColorByElement(elBottom) === BUSY_ITEM_COLOR;

      if (isTopBusy) {
        return patch(topId); // svg.setMineAttrByElement(svg.toggleColorById(elTop));
      }

      if (isBottomBusy) {
        return patch(elBottom); // svg.setMineAttrByElement(svg.toggleColorById(elTop));
      }

      setShowPopup({ topId, bottomId, fallback: mineItem?.id });
    },
    [user, login]
  );

  const onClick = useCallback(
    (id) => {
      if (typeof id === "string") {
        patch(id);
      }

      setShowPopup(false);
    },
    [patch]
  );

  return { showPopup, onItemClick, onClick };
};
