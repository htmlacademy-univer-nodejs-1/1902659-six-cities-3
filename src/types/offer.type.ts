import { City } from "./city.enum.js";
import { Coordinates } from "./coordinates.type.js";
import { Facilities } from "./facilities.enum.js";
import { House } from "./house.enum.js";
import { UserType } from "./user.type.js";

export type OfferType = {
  name: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  iamges: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  housingType: House;
  roomCount: number;
  guestCount: number;
  price: number;
  facilities: Facilities[];
  offerAuthor: UserType;
  commentsCount: number;
  coordinates: Coordinates;
};
