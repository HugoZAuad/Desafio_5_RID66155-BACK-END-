import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import AppError from '@shared/errors/AppErrors';

describe('ErrorHandleMiddleware', () => {
  const mockReq = {} as any;
  const mockNext = jest.fn();

  it('retorna status e mensagem customizada para AppError', () => {
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    ErrorHandleMiddleware.handleError(
      new AppError('Erro customizado', 418),
      mockReq,
      mockRes,
      mockNext
    );

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
    } as any;

    ErrorHandleMiddleware.handleError(
      new Error('Erro genérico'),
      mockReq,
      mockRes,
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      type: 'error',
      message: 'Erro interno no servidor',
    });
  });
});
