import { InjectRepository } from '@nestjs/typeorm';
import BookRepository from '../bookRepository';
import { BookEntity } from '../book.entity';
import { Repository } from 'typeorm';

export default class TypeORMBookRepository implements BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private repository: Repository<BookEntity>,
  ) {}

  async create(book: BookEntity): Promise<void> {
    await this.repository.insert(book);
  }

  async searchOneById(id: string): Promise<BookEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
