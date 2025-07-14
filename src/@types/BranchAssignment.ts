import type { IBranch } from "./Branch";
import type { IUser } from "./User";

export interface IBranchAssignment {
  id: number;
  users?: IUser;
  branches?: IBranch;
  user_id: string;
  branch_id: number;
}
