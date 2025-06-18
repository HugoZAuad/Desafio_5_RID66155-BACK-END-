"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteBook_1 = require("@modules/books/services/DeleteBook");
const AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
describe('DeleteBook Service', () => {
    const mockBookRepository = {
        findById: jest.fn(),
        delete: jest.fn(),
    };
    let service;
    beforeEach(() => {
        jest.clearAllMocks();
        service = new DeleteBook_1.DeleteBook(mockBookRepository);
    });
    it('deve deletar um livro existente e retornar mensagem', async () => {
        mockBookRepository.findById.mockResolvedValue({ id: 1, titulo: 'Livro Teste' });
        mockBookRepository.delete.mockResolvedValue(true);
        const result = await service.execute(1);
        expect(result).toEqual({ sucesso: true, mensagem: 'O livro Livro Teste foi deletado.' });
        expect(mockBookRepository.delete).toHaveBeenCalledWith(1);
    });
    it('deve lançar erro se o livro não existir', async () => {
        mockBookRepository.findById.mockResolvedValue(null);
        await expect(service.execute(1)).rejects.toBeInstanceOf(AppErrors_1.default);
    });
});
