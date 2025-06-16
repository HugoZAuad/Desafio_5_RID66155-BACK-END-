import { IUpdateBook } from '../interfaces/IUpdateBook';
import { IBook } from '../interfaces/IBook';

export interface IUpdateBookService {
  execute(id: number, data: IUpdateBook): Promise<IBook | null>;
}
