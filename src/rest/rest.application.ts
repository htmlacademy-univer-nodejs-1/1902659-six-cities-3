import { inject, injectable } from "inversify";
import { Component } from "../types/component.enum.js";
import { Logger } from "../logger/logger.interface.js";
import { Config } from "../config/config.interface.js";
import { RestSchema } from "../config/rest.schema.js";
import { DatabaseClient } from "../database-client/database-client.interface.js";
import { getMongoURI } from "../utils/getMongoURL.js";

@injectable()
export default class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient
  ) {}

  private async _initDb() {
    const mongoUrl = getMongoURI(
      this.config.get("DB_USER"),
      this.config.get("DB_PASSWORD"),
      this.config.get("DB_HOST"),
      this.config.get("DB_PORT"),
      this.config.get("DB_NAME")
    );

    return this.databaseClient.connect(mongoUrl);
  }

  public async init() {
    this.logger.info("Приложение запущено");
    this.logger.info(`REST-сервер запущен на порту ${this.config.get("PORT")}`);
    this.logger.info("Запуск базы данных...");
    await this._initDb();
    this.logger.info("База данных запущена");
  }
}
