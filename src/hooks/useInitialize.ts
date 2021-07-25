import { useEffect } from "react";
import { fillById } from "../services/svg";
import { BUSY_ITEM_COLOR, FREE_ITEM_COLOR } from "../utils/const";

const data = [
  { id: "taranis_park_061_062_B", status: "free" },
  { id: "taranis_park_061_062_T", status: "busy" },
  { id: "taranis_park_059_060_B", status: "busy" },
  { id: "taranis_park_059_060_T", status: "free" },
  { id: "taranis_park_111_112_B" },
  { id: "taranis_park_111_112_T" },
  { id: "taranis_park_113_114_T" },
  { id: "taranis_park_113_114_B" },
  { id: "taranis_park_140_140_T" },
];

export default () => {
  useEffect(() => {
    setTimeout(() => {
      data.forEach(({ id, status }) => {
        fillById(id, status === "busy" ? BUSY_ITEM_COLOR : FREE_ITEM_COLOR);
      });
    }, 300);
  }, []);
};
