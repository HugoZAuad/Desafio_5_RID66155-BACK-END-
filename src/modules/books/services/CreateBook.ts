import { ICreateBookService } from '../models/service/ICreateBookService';
import { ICreateBook } from '../models/interfaces/ICreateBook';
import { IBook } from '../models/interfaces/IBook';
import { IBookRepository } from '../models/repositories/IBookRepository';
import AppError from '../../../shared/errors/AppErrors';

export class CreateBook implements ICreateBookService {
  private bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(data: ICreateBook): Promise<IBook> {
    // Validação extra de negócio (exemplo)
    if (!data.titulo || !data.pages || !data.ISBN || !data.editora) {
      throw new AppError('Dados obrigatórios não informados.', 400);
    }
    try {
      const book = await this.bookRepository.create(data);
      return book;
    } catch (error) {
      throw new AppError('Erro ao criar livro.', 500);
    }
  }
}
