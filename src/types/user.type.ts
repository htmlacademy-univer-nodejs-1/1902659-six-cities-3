import { User } from "./user.enum.js";

export type UserType = {
  username: string;
  email: string;
  avatar?: string;
  password?: string;
  type: User;
};
