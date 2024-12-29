import "reflect-metadata";
import { Container } from "inversify";
import { createRestApplicationContainer } from "./rest/rest.container.js";
import { createUserContainer } from "./modules/user/user.container.js";
import { createOfferContainer } from "./modules/offer/offer.container.js";
import Application from "./rest/rest.application.js";
import { Component } from "./types/component.enum.js";

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );
  const application = mainContainer.get<Application>(Component.RestApplication);
  await application.init();
}

bootstrap().then((value) => console.log(value));
