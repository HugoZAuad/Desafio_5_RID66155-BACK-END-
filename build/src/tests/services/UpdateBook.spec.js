"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateBook_1 = require("../../modules/books/services/UpdateBook");
const AppErrors_1 = __importDefault(require("../../shared/errors/AppErrors"));
describe('UpdateBook Service', () => {
    const mockBookRepository = {
        findById: jest.fn(),
        update: jest.fn(),
    };
    let service;
    beforeEach(() => {
        jest.clearAllMocks();
        service = new UpdateBook_1.UpdateBook(mockBookRepository);
    });
    it('deve atualizar um livro existente e retornar mensagem', async () => {
        mockBookRepository.findById.mockResolvedValue({ id: 1, titulo: 'Antigo', editora: 'A' });
        mockBookRepository.update.mockResolvedValue({ id: 1, titulo: 'Novo', editora: 'B' });
        const result = await service.execute(1, { titulo: 'Novo' });
        expect(result).toEqual({
            livro: { id: 1, titulo: 'Novo', editora: 'B' },
            mensagem: 'O livro Novo foi atualizado na informação solicitada',
        });
        expect(mockBookRepository.update).toHaveBeenCalledWith(1, { titulo: 'Novo' });
    });
    it('deve lançar erro se o livro não existir', async () => {
        mockBookRepository.findById.mockResolvedValue(null);
        await expect(service.execute(1, { titulo: 'Novo' })).rejects.toBeInstanceOf(AppErrors_1.default);
    });
});
