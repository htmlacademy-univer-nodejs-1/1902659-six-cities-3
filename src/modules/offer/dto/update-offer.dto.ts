import { City } from "../../../types/city.enum.js";
import { House } from "../../../types/house.enum.js";
import { Facilities } from "../../../types/facilities.enum.js";
import { User } from "../../../types/user.type.js";

export default class UpdateOfferDto {
  name?: string;
  description?: string;
  date?: Date;
  city?: City;
  previewImg?: string;
  images?: string[];
  flagIsPremium?: boolean;
  flagIsFavourites?: boolean;
  rating?: 1 | 2 | 3 | 4 | 5;
  housing?: House;
  countRooms?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  countPeople?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  price?: number;
  conveniences?: Facilities;
  author?: User;
  countComments?: number;
  coordinates?: string;
}
