import { readFileSync } from "node:fs";
import { OfferType } from "../types/offer.type.js";
import { City } from "../types/city.enum.js";
import { House } from "../types/house.enum.js";
import { Facilities } from "../types/facilities.enum.js";
import { User } from "../types/user.enum.js";
import { FileReader } from "./file-reader.interface.js";

export default class TSVFileReader implements FileReader {
  private data = " ";

  constructor(public filename: string) {}

  read() {
    this.data = readFileSync(this.filename, "utf-8");
  }

  parseData(): OfferType[] {
    const offers = this.data?.split("\n").filter((row) => row.trim() !== "");
    const offersRows = offers?.map((row) => row.split("\t"));

    return offersRows.map(
      ([
        name,
        description,
        publicationDate,
        city,
        previewImage,
        images,
        premium,
        favorite,
        rating,
        housingType,
        roomCount,
        guestCount,
        facilities,
        offerAuthorName,
        offerAuthorAvatar,
        offerAuthorType,
        offerAuthorEmail,
        offerAuthorPassword,
        commentsCount,
        latitude,
        longitude,
        price,
      ]) => ({
        name: name,
        description: description,
        publicationDate: new Date(publicationDate),
        city: city as unknown as City,
        previewImage: previewImage,
        iamges: images.split(","),
        premium: premium as unknown as boolean,
        favorite: favorite as unknown as boolean,
        rating: parseFloat(rating),
        housingType: housingType as unknown as House,
        roomCount: parseInt(roomCount, 10),
        guestCount: parseInt(guestCount, 10),
        price: parseInt(price, 10),
        facilities: facilities
          .split(",")
          .map((facility) => facility as unknown as Facilities),
        offerAuthor: {
          username: offerAuthorName,
          email: offerAuthorEmail,
          avatar: offerAuthorAvatar,
          password: offerAuthorPassword,
          type: offerAuthorType as unknown as User,
        },
        commentsCount: parseInt(commentsCount, 10),
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      })
    );
  }
}
