import { Container } from "inversify";
import { OfferService } from "./offer-service.interface.js";
import { Component } from "../../types/component.enum.js";
import DefaultOfferService from "./default-offer.service.js";
import { types } from "@typegoose/typegoose";
import { OfferEntity, OfferModel } from "./offer.entity.js";

export function createOfferContainer() {
  const offerConatiner = new Container();

  offerConatiner
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService);
  offerConatiner
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  return offerConatiner;
}