import type { IAssignment } from "../enums/Assignment";

export type RemitAddOn = {
  value: number;
  name: string;
};

export type RemitExpense = {
  value: number;
  name: string;
  branchId: number;
  assignment: IAssignment | undefined;
};
