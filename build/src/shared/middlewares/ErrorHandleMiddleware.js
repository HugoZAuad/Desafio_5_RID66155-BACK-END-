"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
const celebrate_1 = require("celebrate");
class ErrorHandleMiddleware {
    static handleError(error, _req, res, _next) {
        if ((0, celebrate_1.isCelebrateError)(error)) {
            const validationError = error.details.get('body') || error.details.get('params') || error.details.get('query');
            const message = validationError ? validationError.message : 'Erro de validação';
            return res.status(400).json({
                type: 'error',
                message,
            });
        }
        if (error instanceof AppErrors_1.default) {
            return res.status(error.statusCode).json({
                type: 'error',
                message: error.message,
            });
        }
        return res.status(500).json({
            type: 'error',
            message: 'Erro interno no servidor',
        });
    }
}
exports.default = ErrorHandleMiddleware;
