import { Container } from "inversify";
import { UserService } from "./user-service.interface.js";
import { Component } from "../../types/component.enum.js";
import DefaultUserService from "./default-user.service.js";
import { types } from "@typegoose/typegoose";
import { UserEntity, UserModel } from "./user.entity.js";
import { BaseController } from "../../controller/base-controller.js";
import { UserController } from "./controller/user.controller.js";

export function createUserContainer() {
  const userContainer = new Container();

  userContainer
    .bind<UserService>(Component.UserService)
    .to(DefaultUserService)
    .inSingletonScope();
  userContainer
    .bind<types.ModelType<UserEntity>>(Component.UserModel)
    .toConstantValue(UserModel);
  userContainer
    .bind<BaseController>(Component.UserController)
    .to(UserController)
    .inSingletonScope();

  return userContainer;
}
