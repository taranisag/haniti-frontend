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

export default (setLoaded: any) => {
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

      const svg = document.getElementsByTagName("svg")?.[0];

      if (svg) {
        svg.setAttribute("width", "100vw");
        svg.setAttribute("height", "100vh");
        svg.setAttribute("viewBox", "0 0 116 116");
        svg.setAttribute("preserveAspectRatio", "none");
        svg.setAttribute("x", "0");
        svg.setAttribute("y", "0");
      }

      setLoaded(true);
    }
  }, [svgIsReady, parkings]);

  return { svgIsReady, onSvgLoaded, setSvgIsReady };
};
