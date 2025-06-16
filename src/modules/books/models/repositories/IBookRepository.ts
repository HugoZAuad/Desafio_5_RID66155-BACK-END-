import { IBook } from '../interfaces/IBook';
import { ICreateBook } from '../interfaces/ICreateBook';
import { IUpdateBook } from '../interfaces/IUpdateBook';

export interface IBookRepository {
  create(data: ICreateBook): Promise<IBook>;
  findAll(): Promise<IBook[]>;
  findById(id: number): Promise<IBook | null>
  update(id: number, data: IUpdateBook): Promise<IBook | null>;
  delete(id: number): Promise<boolean>;
}
