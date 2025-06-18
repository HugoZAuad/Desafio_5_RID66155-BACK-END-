"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBook = void 0;
const AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
class UpdateBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute(id, data) {
        try {
            const livroAntigo = await this.bookRepository.findById(id);
            if (!livroAntigo) {
                throw new AppErrors_1.default('Livro não encontrado para atualização.', 404);
            }
            const updatedBook = await this.bookRepository.update(id, data);
            if (!updatedBook) {
                throw new AppErrors_1.default('Livro não encontrado para atualização.', 404);
            }
            const mensagem = `O livro ${updatedBook.titulo} foi atualizado na informação solicitada`;
            return { livro: updatedBook, mensagem };
        }
        catch (error) {
            if (error instanceof AppErrors_1.default)
                throw error;
            throw new AppErrors_1.default('Erro ao atualizar livro.', 500);
        }
    }
}
exports.UpdateBook = UpdateBook;
