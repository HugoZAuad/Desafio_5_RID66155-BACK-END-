import { Repository, DataSource } from 'typeorm';
import { livros } from '../entities/Book';
import { IBookRepository } from '../../../models/repositories/IBookRepository';
import { ICreateBook } from '../../../models/interfaces/ICreateBook';
import { IUpdateBook } from '../../../models/interfaces/IUpdateBook';
import { IBook } from '../../../models/interfaces/IBook';

export class BookRepositories implements IBookRepository {
  private repository: Repository<livros>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(livros);
  }

  async create(bookData: ICreateBook): Promise<IBook> {
    const book = this.repository.create(bookData);
    return await this.repository.save(book);
  }

  async findById(id: number): Promise<IBook | null> {
    return await this.repository.findOneBy({id});
  }

  async findAll(): Promise<IBook[]> {
    return await this.repository.find();
  }

  async update(id: number, updateData: IUpdateBook): Promise<IBook | null> {
    const book = await this.repository.findOneBy({ id });
    if (!book) {
      return null;
    }
    this.repository.merge(book, updateData);
    return await this.repository.save(book);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
