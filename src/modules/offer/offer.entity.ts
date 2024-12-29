import typegoose, {
  defaultClasses,
  getModelForClass,
} from "@typegoose/typegoose";
import { OfferType } from "../../types/offer.type.js";
import { City } from "../../types/city.enum.js";
import { House } from "../../types/house.enum.js";
import { Facilities } from "../../types/facilities.enum.js";
import { UserEntity } from "../user/user.entity.js";
import { User } from "../../types/user.type.js";
import { Coordinates } from "../../types/coordinates.type.js";

const { prop, modelOptions } = typegoose;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: "offers",
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements OfferType {
  @prop({
    required: true,
    minlength: [10, "Min length for name is 10"],
    maxlength: [100, "Min length for name is 100"],
  })
  public name!: string;

  @prop({
    required: true,
    minlength: [20, "Min length for description is 20"],
    maxlength: [1024, "Min length for description is 1024"],
  })
  public description!: string;

  @prop({ required: true })
  public publicationDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City,
  })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({
    required: true,
    type: () => String,
  })
  public iamges!: string[];

  @prop({ required: true })
  public premium!: boolean;

  @prop({ required: true })
  public favorite!: boolean;

  @prop({ required: true })
  public rating!: 1 | 2 | 3 | 4 | 5;

  @prop({
    required: true,
    type: () => String,
    enum: House,
  })
  public housingType!: House;

  @prop({ required: true })
  public roomCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  @prop({ required: true })
  public guestCount!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  @prop({
    required: true,
    min: [100, "Min length for price is 100"],
    max: [100000, "Min length for price is 100000"],
  })
  public cost!: number;

  @prop({
    required: true,
    type: () => String,
    enum: Facilities,
  })
  public facilities!: Facilities;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public offerAuthor!: User;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({
    required: true,
    type: () => String,
  })
  @prop({ required: true })
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
