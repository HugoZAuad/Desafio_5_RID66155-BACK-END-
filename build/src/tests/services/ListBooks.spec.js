"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ListBooks_1 = require("../../modules/books/services/ListBooks");
const AppErrors_1 = __importDefault(require("../../shared/errors/AppErrors"));
describe('ListBooks Service', () => {
    const mockBookRepository = {
        findAll: jest.fn(),
    };
    let service;
    beforeEach(() => {
        jest.clearAllMocks();
        service = new ListBooks_1.ListBooks(mockBookRepository);
    });
    it('deve listar todos os livros', async () => {
        const fakeBooks = [
            { id: 1, titulo: 'Livro 1', pages: 100, ISBN: 123, editora: 'Editora X' },
            { id: 2, titulo: 'Livro 2', pages: 200, ISBN: 456, editora: 'Editora Y' },
        ];
        mockBookRepository.findAll.mockResolvedValue(fakeBooks);
        const result = await service.execute();
        expect(result).toEqual(fakeBooks);
        expect(mockBookRepository.findAll).toHaveBeenCalled();
    });
    it('deve lançar erro ao falhar na listagem', async () => {
        mockBookRepository.findAll.mockRejectedValue(new Error('DB error'));
        await expect(service.execute()).rejects.toBeInstanceOf(AppErrors_1.default);
    });
});
