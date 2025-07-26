import type { IInventoryItem } from "../@types/SalesReport";

export const CHICKY_OINK_PRODUCTS: { [key: string]: IInventoryItem } = {
  regular_chicken: {
    name: "Regular Chicken",
    attribute: "regular_chicken",
    price: 310,
  },
  spicy_chicken: {
    name: "Spicy Chicken",
    attribute: "spicy_chicken",
    price: 320,
  },
  regular_liempo: {
    name: "Regular Liempo",
    attribute: "regular_liempo",
    price: 260,
  },
  spicy_liempo: {
    name: "Spicy Liempo",
    attribute: "spicy_liempo",
    price: 270,
  },
  liog: { name: "Liog", attribute: "liog", price: 12 },
  spicy_liog: {
    name: "Spicy Liog",
    attribute: "spicy_liog",
    price: 12,
  },
  poso: { name: "Poso", attribute: "poso", price: 8 },
  atchara_small: {
    name: "Atchara Small",
    attribute: "atchara_small",
    price: 30,
  },
  atchara_big: {
    name: "Atchara Big",
    attribute: "atchara_big",
    price: 70,
  },
  uling: { name: "Uling", attribute: "uling", price: 0 },
};
