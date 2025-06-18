"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepositories = void 0;
const Book_1 = require("@modules/books/infra/database/entities/Book");
class BookRepositories {
    constructor(dataSource) {
        this.repository = dataSource.getRepository(Book_1.livros);
    }
    async create(bookData) {
        const book = this.repository.create(bookData);
        return await this.repository.save(book);
    }
    async findById(id) {
        return await this.repository.findOneBy({ id });
    }
    async findAll() {
        return await this.repository.find();
    }
    async update(id, updateData) {
        const book = await this.repository.findOneBy({ id });
        if (!book) {
            return null;
        }
        this.repository.merge(book, updateData);
        return await this.repository.save(book);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
exports.BookRepositories = BookRepositories;
