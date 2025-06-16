import { Request, Response } from 'express';
import { BookRepositories } from '@modules/books/infra/database/repositories/BookRepositories';
import { CreateBook } from '@modules/books/services/CreateBook';
import { DeleteBook } from '@modules/books/services/DeleteBook';
import { ListBooks } from '@modules/books/services/ListBooks';
import { UpdateBook } from '@modules/books/services/UpdateBook';
import { AppDataSource } from '@config/database';

const bookRepository = new BookRepositories(AppDataSource);

export class BooksControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const createBook = new CreateBook(bookRepository);
    const book = await createBook.execute(request.body);
    return response.status(201).json(book);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listBooks = new ListBooks(bookRepository);
    const books = await listBooks.execute();
    return response.json(books);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const book = await bookRepository.findById(Number(id));
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.json(book);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const updateBook = new UpdateBook(bookRepository);
    const result = await updateBook.execute(Number(id), request.body);
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    // Retorna mensagem personalizada para o front-end
    return response.json(result);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteBook = new DeleteBook(bookRepository);
    const result = await deleteBook.execute(Number(id));
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.json(result);
  }
}
