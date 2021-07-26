import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
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
  const [parkings, setParkings] = useState<undefined | any>();
  const [svgIsReady, setSvgIsReady] = useState<boolean>(false);
  const onSvgLoaded = useCallback((err) => {
    if (!err) {
      setTimeout(() => {
        setSvgIsReady(true);
      }, 500);
    }
  }, []);

  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await api.get(
          "https://haniti-3aeed-default-rtdb.europe-west1.firebasedatabase.app/parkings.json"
        );

        setParkings(
          Object.keys(data).map((id: string) => ({ id, ...data[id] }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fn();
  }, []);

  useEffect(() => {
    if (svgIsReady && parkings) {
      parkings.forEach(({ id, status, userId }: any) => {
        const isBusy = status === ITEM_STATUS_BUSY && userId;
        const mine = isBusy ? userId : "false";

        setMineAttrByElement(
          setFillColorByElement(
            getElementById(id),
            isBusy ? BUSY_ITEM_COLOR : FREE_ITEM_COLOR
          ),
          mine
        );
      });
    }
  }, [svgIsReady, parkings]);

  return { svgIsReady, onSvgLoaded, setSvgIsReady };
};
