import { ICreateBook } from '../interfaces/ICreateBook';
import { IBook } from '../interfaces/IBook';

export interface ICreateBookService {
  execute(data: ICreateBook): Promise<IBook>;
}
