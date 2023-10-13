import { ArgumentValidationError } from "errors";
import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

export const errorHandlerWrapper = (
  func: (
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        throw new ArgumentValidationError(
          'Invalid Argument',
          errors.array().map((value: ValidationError) => value.msg)
        );
      }

      await func(req, res, next);
    } catch(error: unknown) {
      next(error);
    }
  }
}
