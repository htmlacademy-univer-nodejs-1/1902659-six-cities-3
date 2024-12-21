import { UserType } from "./user.type.js";

export type Comment = {
  text: string;
  publicationDate: string;
  rating: number;
  author: UserType;
};
