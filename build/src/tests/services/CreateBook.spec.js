"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateBook_1 = require("../../modules/books/services/CreateBook");
const AppErrors_1 = __importDefault(require("../../shared/errors/AppErrors"));
describe('CreateBook Service', () => {
    const mockBookRepository = {
        create: jest.fn(),
    };
    const fakeBook = { id: 1, titulo: 'Novo Livro', pages: 100, ISBN: 123, editora: 'Editora X' };
    let service;
    beforeEach(() => {
        jest.clearAllMocks();
        service = new CreateBook_1.CreateBook(mockBookRepository);
    });
    it('deve criar um livro com sucesso', async () => {
        mockBookRepository.create.mockResolvedValue(fakeBook);
        const result = await service.execute({
            titulo: 'Novo Livro',
            pages: 100,
            ISBN: 123,
            editora: 'Editora X',
        });
        expect(result).toEqual(fakeBook);
        expect(mockBookRepository.create).toHaveBeenCalledWith({
            titulo: 'Novo Livro',
            pages: 100,
            ISBN: 123,
            editora: 'Editora X',
        });
    });
    it('deve lançar erro ao falhar na criação', async () => {
        mockBookRepository.create.mockRejectedValue(new Error('DB error'));
        await expect(service.execute({
            titulo: 'Novo Livro',
            pages: 100,
            ISBN: 123,
            editora: 'Editora X',
        })).rejects.toBeInstanceOf(AppErrors_1.default);
    });
});
