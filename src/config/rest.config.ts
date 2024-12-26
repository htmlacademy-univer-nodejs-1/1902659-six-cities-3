import { inject, injectable } from "inversify";
import { Config } from "./config.interface.js";
import { RestSchema } from "./rest.schema.js";
import { Component } from "../types/component.enum.js";

@injectable()
export default class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(@inject(Component.Logger) private readonly logger: Logger)
}
