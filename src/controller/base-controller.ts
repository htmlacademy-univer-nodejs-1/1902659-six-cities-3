import { injectable } from "inversify";
import { Controller } from "./controller.interface.js";
import { Response, Router } from "express";
import { Logger } from "../logger/logger.interface.js";
import { StatusCodes } from "http-status-codes";
import { Route } from "../types/route.interface.js";
import asyncHandler from "express-async-handler";

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(protected readonly logger: Logger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(this: BaseController, route: Route) {
    this._router[route.method](
      route.path,
      asyncHandler(route.handler.bind(this))
    );
    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`
    );
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res.type("application/json").status(statusCode).json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
