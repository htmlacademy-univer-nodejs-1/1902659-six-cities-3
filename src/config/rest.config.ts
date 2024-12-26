import { inject, injectable } from "inversify";
import { Config } from "./config.interface.js";
import { configRestSchema, RestSchema } from "./rest.schema.js";
import { Component } from "../types/component.enum.js";
import { Logger } from "../logger/logger.interface.js";
import { config } from "dotenv";

@injectable()
export default class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error("Невозможно прочить env-файл");
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: "strict", output: this.logger.info });
    this.config = configRestSchema.getProperties();
    this.logger.info(".env файд найден и прочитан");
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
