import { BUSY_ITEM_COLOR, FREE_ITEM_COLOR, ITEM_MINE } from "../../utils/const";

export const getElementById = (id: string) => document.getElementById(id);

export const getFillColorByElement = (el: HTMLElement | null) =>
  el?.style?.fill;

export const setFillColorByElement = (
  el: HTMLElement | null,
  color: string
) => {
  el?.setAttribute("style", `fill: ${color}`);

  return el;
};

export const getMineAttrByElement = (el: HTMLElement | null) =>
  el?.getAttribute(ITEM_MINE);

export const setMineAttrByElement = (
  el: HTMLElement | null,
  value: string = "false"
) =>
  el?.setAttribute(
    ITEM_MINE,
    `${getMineAttrByElement(el) === value ? false : value}`
  );

export const toggleColorById = (el: HTMLElement | null) => {
  if (el) {
    if (el.style.fill === BUSY_ITEM_COLOR) {
      setFillColorByElement(el, FREE_ITEM_COLOR);
    } else {
      setFillColorByElement(el, BUSY_ITEM_COLOR);
    }
  }

  return el;
};

export const getMineItem = (uui: string) =>
  document.querySelectorAll(`[${ITEM_MINE}='${uui}']`)?.[0];
