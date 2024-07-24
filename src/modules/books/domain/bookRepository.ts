import { BookEntity } from './book.entity';

export const BookRepositoryInterface = Symbol();

export default interface BookRepository {
  create(book: BookEntity): Promise<void>;
  delete(id: number): Promise<void>;
}
