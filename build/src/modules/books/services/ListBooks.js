"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBooks = void 0;
const AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
class ListBooks {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute() {
        try {
            const books = await this.bookRepository.findAll();
            return books;
        }
        catch (error) {
            throw new AppErrors_1.default('Erro ao listar livros.', 500);
        }
    }
}
exports.ListBooks = ListBooks;
