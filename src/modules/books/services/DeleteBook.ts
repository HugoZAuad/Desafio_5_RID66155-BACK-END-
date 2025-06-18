import { IDeleteBookService } from '../models/service/IDeleteBookService';
import { IBookRepository } from '../models/repositories/IBookRepository';
import AppError from '@shared/errors/AppErrors';

export class DeleteBook implements IDeleteBookService {
  private bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(id: number): Promise<{ sucesso: boolean, mensagem: string }> {
    try {
      const livro = await this.bookRepository.findById(id);
      if (!livro) {
        throw new AppError('Livro não encontrado para exclusão.', 404);
      }

      const result = await this.bookRepository.delete(id);
      if (!result) {
        throw new AppError('Livro não encontrado para exclusão.', 404);
      }

      const mensagem = `O livro ${livro.titulo} foi deletado.`;
      return { sucesso: true, mensagem };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Erro ao deletar livro.', 500);
    }
  }
}
