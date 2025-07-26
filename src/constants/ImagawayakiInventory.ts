import type { ImagawayakiSales } from "../@types/ImagawayakiReport";

export interface IInventoryItem {
  name: string;
  attribute: keyof ImagawayakiSales;
  price: number;
}

export const IMAGAWAYAKI_PRODUCTS: { [key: string]: IInventoryItem } = {
  chocolate: {
    name: "Chocolate",
    attribute: "chocolate",
    price: 10,
  },
  oreo: {
    name: "Oreo",
    attribute: "oreo",
    price: 10,
  },
  cheese: {
    name: "Cheese",
    attribute: "cheese",
    price: 10,
  },
  custard: {
    name: "Custard",
    attribute: "custard",
    price: 10,
  },
  plain: { name: "Plain", attribute: "plain", price: 12 },
  juice: {
    name: "Juice",
    attribute: "juice",
    price: 25,
  },
  mineral_water: {
    name: "Mineral Water",
    attribute: "mineral_water",
    price: 20,
  },
  minute_maid: { name: "Minute Maid", attribute: "minute_maid", price: 20 },
};
