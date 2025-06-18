"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandleMiddleware_1 = __importDefault(require("@shared/middlewares/ErrorHandleMiddleware"));
const AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
describe('ErrorHandleMiddleware', () => {
    const mockReq = {};
    const mockNext = jest.fn();
    it('retorna status e mensagem customizada para AppError', () => {
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        ErrorHandleMiddleware_1.default.handleError(new AppErrors_1.default('Erro customizado', 418), mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(418);
        expect(mockRes.json).toHaveBeenCalledWith({
            type: 'error',
            message: 'Erro customizado',
        });
    });
    it('retorna status 500 para erros genéricos', () => {
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        ErrorHandleMiddleware_1.default.handleError(new Error('Erro genérico'), mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            type: 'error',
            message: 'Erro interno no servidor',
        });
    });
});
