// eslint-disable-next-line
import { useState, useCallback } from "react";
import * as svg from "../services/svg";
import {
  TOP_PREFIX_SVG,
  BOTTOM_PREFIX_SVG,
  SINGLE_PREFIX_SVG,
  DELIMITER_ID,
  BUSY_ITEM_COLOR,
} from "../utils/const";

export type ShowPopupType =
  | { topId: string; bottomId: string; fallback: string | undefined }
  | false;

export default () => {
  const [showPopup, setShowPopup] = useState<ShowPopupType>(false);

  const onItemClick = useCallback((e) => {
    const id: string = e?.target?.id;
    const arr = (id || "").split(DELIMITER_ID);

    if (arr?.[0] !== "taranis") {
      return;
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

      svg.setMineAttrByElement(svg.toggleColorById(svg.getElementById(mineId)));

      if (mineId === id || mineId === topId || mineId === bottomId) {
        return;
      }
    }

    if (onlyOneItem) {
      return svg.setMineAttrByElement(
        svg.toggleColorById(svg.getElementById(id))
      );
    }

    const isTopBusy = svg.getFillColorByElement(elTop) === BUSY_ITEM_COLOR;
    const isBottomBusy =
      svg.getFillColorByElement(elBottom) === BUSY_ITEM_COLOR;

    if (isTopBusy) {
      return svg.setMineAttrByElement(svg.toggleColorById(elTop));
    }

    if (isBottomBusy) {
      return svg.setMineAttrByElement(svg.toggleColorById(elTop));
    }

    setShowPopup({ topId, bottomId, fallback: mineItem?.id });
  }, []);

  const onClick = useCallback((id) => {
    if (typeof id === "string") {
      svg.setMineAttrByElement(svg.toggleColorById(svg.getElementById(id)));
    }

    setShowPopup(false);
  }, []);

  return { showPopup, onItemClick, onClick };
};
