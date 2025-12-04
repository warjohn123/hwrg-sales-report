export const IAssignment = {
  CHICKY_OINK: "Chicky Oink",
  IMAGAWAYAKI: "Imagawayaki",
  POTATO_FRY: "Potato Fry",
  HWRG_EGGS: "HWRG Eggs",
} as const;

export type IAssignment = (typeof IAssignment)[keyof typeof IAssignment];
