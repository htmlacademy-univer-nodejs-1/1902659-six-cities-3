import { City } from "../../../types/city.enum.js";
import { Coordinates } from "../../../types/coordinates.type.js";
import { Facilities } from "../../../types/facilities.enum.js";
import { House } from "../../../types/house.enum.js";
import { User } from "../../../types/user.enum.js";

export default class CreateOfferDto {
  name!: string;
  description!: string;
  publicationDate!: Date;
  city!: City;
  previewImage!: string;
  iamges!: string[];
  premium!: boolean;
  favorite!: boolean;
  rating!: number;
  housingType!: House;
  roomCount!: number;
  guestCount!: number;
  cost!: number;
  facilities!: Facilities;
  offerAuthor!: User;
  commentsCount!: number;
  coordinates!: Coordinates;
}
