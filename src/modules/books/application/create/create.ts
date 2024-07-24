import { Inject, Injectable } from '@nestjs/common';
import BookRepository, {
  BookRepositoryInterface,
} from '../../domain/bookRepository';
import { CreateBookDto } from './create-book.dto';
import { BookDto } from '../searchByCriteria/book.dto';

@Injectable()
export default class CreateBook {
  constructor(
    @Inject(BookRepositoryInterface)
    private bookRepository: BookRepository,
  ) {}

  async run(data: CreateBookDto): Promise<BookDto> {
    // TODO
  }
}
