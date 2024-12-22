import { City } from "../types/city.enum.js";
import { House } from "../types/house.enum.js";
import { OfferType } from "../types/offer.type.js";
import { User } from "../types/user.enum.js";

export function createOffer(offer: string): OfferType {
  const offerRow = offer.replace("\n", "").split("\t");
  const [
    name,
    description,
    publicationDate,
    city,
    previewImage,
    iamges,
    premium,
    favorite,
    rating,
    housingType,
    roomCount,
    guestCount,
    cost,
    facilities,
    offerAuthorName,
    offerAuthorAvatar,
    offerAuthorType,
    offerAuthorEmail,
    offerAuthorPassword,
    commentsCount,
    latitude,
    longitude,
  ] = offerRow;

  return {
    name: name,
    description: description,
    publicationDate: new Date(publicationDate),
    city: city as unknown as City,
    previewImage: previewImage,
    iamges: iamges.split(","),
    premium: premium as unknown as boolean,
    favorite: favorite as unknown as boolean,
    rating: parseFloat(rating),
    housingType: housingType as unknown as House,
    roomCount: parseInt(roomCount, 10),
    guestCount: parseInt(guestCount, 10),
    cost: parseInt(cost, 10),
    facilities: facilities.split(",").map((facility) => parseInt(facility, 10)),
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
  };
}
