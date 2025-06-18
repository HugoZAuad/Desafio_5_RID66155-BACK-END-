"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksControllers = void 0;
const BookRepositories_1 = require("../../../infra/database/repositories/BookRepositories");
const CreateBook_1 = require("@modules/books/services/CreateBook");
const DeleteBook_1 = require("@modules/books/services/DeleteBook");
const ListBooks_1 = require("@modules/books/services/ListBooks");
const UpdateBook_1 = require("@modules/books/services/UpdateBook");
const database_1 = require("@config/database");
const bookRepository = new BookRepositories_1.BookRepositories(database_1.AppDataSource);
class BooksControllers {
    async create(request, response) {
        const createBook = new CreateBook_1.CreateBook(bookRepository);
        const book = await createBook.execute(request.body);
        return response.status(201).json(book);
    }
    async list(request, response) {
        const listBooks = new ListBooks_1.ListBooks(bookRepository);
        const books = await listBooks.execute();
        return response.json(books);
    }
    async getById(request, response) {
        const { id } = request.params;
        const book = await bookRepository.findById(Number(id));
        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.json(book);
    }
    async update(request, response) {
        const { id } = request.params;
        const updateBook = new UpdateBook_1.UpdateBook(bookRepository);
        const result = await updateBook.execute(Number(id), request.body);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        // Retorna mensagem personalizada para o front-end
        return response.json(result);
    }
    async delete(request, response) {
        const { id } = request.params;
        const deleteBook = new DeleteBook_1.DeleteBook(bookRepository);
        const result = await deleteBook.execute(Number(id));
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.json(result);
    }
}
exports.BooksControllers = BooksControllers;
