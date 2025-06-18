"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksControllers = void 0;
const BookRepositories_1 = require("../../../infra/database/repositories/BookRepositories");
const CreateBook_1 = require("../../../services/CreateBook");
const DeleteBook_1 = require("../../../services/DeleteBook");
const ListBooks_1 = require("../../../services/ListBooks");
const UpdateBook_1 = require("../../../services/UpdateBook");
const database_1 = require("../../../../../config/database");
const bookRepository = new BookRepositories_1.BookRepositories(database_1.AppDataSource);
class BooksControllers {
    async create(request, response) {
        try {
            const createBook = new CreateBook_1.CreateBook(bookRepository);
            const book = await createBook.execute(request.body);
            return response.status(201).json(book);
        }
        catch (error) {
            console.error('Erro ao criar livro:', error);
            return response.status(500).json({ type: 'error', message: 'Erro ao criar livro.' });
        }
    }
    async list(request, response) {
        try {
            const listBooks = new ListBooks_1.ListBooks(bookRepository);
            const books = await listBooks.execute();
            return response.json(books);
        }
        catch (error) {
            console.error('Erro ao listar livros:', error);
            return response.status(500).json({ type: 'error', message: 'Erro ao listar livros.' });
        }
    }
    async getById(request, response) {
        try {
            const { id } = request.params;
            const book = await bookRepository.findById(Number(id));
            if (!book) {
                return response.status(404).json({ message: 'Book not found' });
            }
            return response.json(book);
        }
        catch (error) {
            console.error('Erro ao buscar livro por ID:', error);
            return response.status(500).json({ message: 'Erro interno ao buscar o livro.' });
        }
    }
    async update(request, response) {
        try {
            const { id } = request.params;
            const updateBook = new UpdateBook_1.UpdateBook(bookRepository);
            const result = await updateBook.execute(Number(id), request.body);
            if (!result) {
                return response.status(404).json({ message: 'Book not found' });
            }
            return response.json(result);
        }
        catch (error) {
            console.error('Erro ao atualizar livro:', error);
            return response.status(500).json({ message: 'Erro ao atualizar livro.' });
        }
    }
    async delete(request, response) {
        try {
            const { id } = request.params;
            const deleteBook = new DeleteBook_1.DeleteBook(bookRepository);
            const result = await deleteBook.execute(Number(id));
            if (!result) {
                return response.status(404).json({ message: 'Book not found' });
            }
            return response.json(result);
        }
        catch (error) {
            console.error('Erro ao deletar livro:', error);
            return response.status(500).json({ message: 'Erro ao deletar livro.' });
        }
    }
}
exports.BooksControllers = BooksControllers;
