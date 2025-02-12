import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { Middleware } from "./middleware.interface.js";
import { HttpError } from "../errors/http-errors.js";

export class PrivateRouteMiddleware implements Middleware {
  public async execute(
    { user }: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized",
        "PrivateRouteMiddleware"
      );
    }
    return next();
  }
}
