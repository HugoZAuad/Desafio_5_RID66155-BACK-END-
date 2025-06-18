"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBook = void 0;
const AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
class CreateBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute(data) {
        // Validação extra de negócio (exemplo)
        if (!data.titulo || !data.pages || !data.ISBN || !data.editora) {
            throw new AppErrors_1.default('Dados obrigatórios não informados.', 400);
        }
        try {
            const book = await this.bookRepository.create(data);
            return book;
        }
        catch (error) {
            throw new AppErrors_1.default('Erro ao criar livro.', 500);
        }
    }
}
exports.CreateBook = CreateBook;
