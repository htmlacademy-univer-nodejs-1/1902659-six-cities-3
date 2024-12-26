import { inject, injectable } from "inversify";
import { Component } from "../types/component.enum.js";
import { Logger } from "../logger/logger.interface.js";
import { Config } from "../config/config.interface.js";
import { RestSchema } from "../config/rest.schema.js";

@injectable()
export default class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public async init() {
    this.logger.info("Приложение запущено");
    this.logger.info(`REST-сервер запущен на порту ${this.config.get("PORT")}`);
  }
}
