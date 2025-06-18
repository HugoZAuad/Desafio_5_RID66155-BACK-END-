"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBook = void 0;
const AppErrors_1 = __importDefault(require("@shared/errors/AppErrors"));
class DeleteBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute(id) {
        try {
            const livro = await this.bookRepository.findById(id);
            if (!livro) {
                throw new AppErrors_1.default('Livro não encontrado para exclusão.', 404);
            }
            const result = await this.bookRepository.delete(id);
            if (!result) {
                throw new AppErrors_1.default('Livro não encontrado para exclusão.', 404);
            }
            const mensagem = `O livro ${livro.titulo} foi deletado.`;
            return { sucesso: true, mensagem };
        }
        catch (error) {
            if (error instanceof AppErrors_1.default)
                throw error;
            throw new AppErrors_1.default('Erro ao deletar livro.', 500);
        }
    }
}
exports.DeleteBook = DeleteBook;
