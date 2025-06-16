import { IBook } from '../interfaces/IBook';

export interface IListBooksService {
  execute(): Promise<IBook[]>;
}
