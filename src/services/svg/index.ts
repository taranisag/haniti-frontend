import { BUSY_ITEM_COLOR, FREE_ITEM_COLOR } from "../../utils/const";

export const getElementById = (id: string) => document.getElementById(id);

export const fillById = (id: string, color: string) => {
  getElementById(id)?.setAttribute("style", `fill: ${color}`);
};

export const toggleColorById = (id: string) => {
  const el = getElementById(id);

  if (el) {
    if (el.style.fill === BUSY_ITEM_COLOR) {
      el.setAttribute("style", `fill: ${FREE_ITEM_COLOR}`);
    } else {
      el.setAttribute("style", `fill: ${BUSY_ITEM_COLOR}`);
    }
  }
};
