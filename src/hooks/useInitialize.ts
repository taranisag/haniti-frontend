import { useCallback, useEffect, useState } from "react";
import {
  getElementById,
  setFillColorByElement,
  setMineAttrByElement,
} from "../services/svg";
import {
  BUSY_ITEM_COLOR,
  FREE_ITEM_COLOR,
  ITEM_STATUS_BUSY,
} from "../utils/const";

const data = [
  { id: "taranis_park_061_062_B", status: "free" },
  { id: "taranis_park_061_062_T", status: "free" },
  { id: "taranis_park_059_060_B" },
  { id: "taranis_park_059_060_T", status: "free" },
  { id: "taranis_park_111_112_B" },
  { id: "taranis_park_111_112_T" },
  { id: "taranis_park_113_114_T" },
  { id: "taranis_park_113_114_B" },
  { id: "taranis_park_140_140_T", status: "busy", mine: true },
];

export default () => {
  const [svgIsReady, setSvgIsReady] = useState<boolean>(false);
  const onSvgLoaded = useCallback((err) => {
    if (!err) {
      setSvgIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (svgIsReady) {
      data.forEach(({ id, status, mine = false }) => {
        setMineAttrByElement(
          setFillColorByElement(
            getElementById(id),
            status === ITEM_STATUS_BUSY ? BUSY_ITEM_COLOR : FREE_ITEM_COLOR
          ),
          mine
        );
      });
    }
  }, [svgIsReady]);

  return { onSvgLoaded };
};
