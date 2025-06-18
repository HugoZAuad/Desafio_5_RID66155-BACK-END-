import AppError from "../errors/AppErrors";
import { NextFunction, Request, Response } from "express";
import { isCelebrateError } from "celebrate";

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (isCelebrateError(error)) {
      const validationError = error.details.get('body') || error.details.get('params') || error.details.get('query');
      const message = validationError ? validationError.message : 'Erro de validação';
      return res.status(400).json({
        type: 'error',
        message,
      });
    }

    if(error instanceof AppError) {
      const appError = error as AppError;
      return res.status(appError.statusCode).json({
        type: 'error',
        message: appError.message,
      });
    }

    return res.status(500).json({
      type: 'error',
      message: 'Erro interno no servidor',
    });
  }
}
