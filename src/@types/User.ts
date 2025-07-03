export type IUser = {
  id: string;
  name: string;
  type: IUserType;
  assignment: IAssignment;
  address: string;
  bday: string;
  contact: string;
  email: string;
  picture: string | null;
  documents: string[];
  rate_per_day: number;
  first_duty_date: string;
};

export type IUserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];
export type IAssignment =
  (typeof EMPLOYEE_ASSIGNMENT)[keyof typeof EMPLOYEE_ASSIGNMENT];

export const USER_TYPE = {
  EMPLOYEE: "employee",
  SALES_REPORT: "sales_report",
  ADMIN: "admin",
};

export const EMPLOYEE_ASSIGNMENT = {
  CHICKY_OINK: "Chicky Oink",
  IMAGAWAYAKI: "Imagawayaki",
  POTATO_FRY: "Potato Fry",
};
