import { BookEntity } from './book.entity';

export const BookRepositoryInterface = Symbol();

export default interface BookRepository {
  create(book: BookEntity): Promise<void>;
  searchOneById(id: string): Promise<BookEntity | null>;
  delete(id: string): Promise<void>;
}
