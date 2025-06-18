import { IListBooksService } from '../models/service/IListBooksService';
import { IBookRepository } from '../models/repositories/IBookRepository';
import { IBook } from '../models/interfaces/IBook';
import AppError from '../../../shared/errors/AppErrors';

export class ListBooks implements IListBooksService {
  private bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(): Promise<IBook[]> {
    try {
      const books = await this.bookRepository.findAll();
      return books;
    } catch (error) {
      throw new AppError('Erro ao listar livros.', 500);
    }
  }
}
