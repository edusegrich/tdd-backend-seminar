import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import BookRepository, {
  BookRepositoryInterface,
} from '../../domain/bookRepository';
import { BookDto } from '../searchByCriteria/book.dto';

@Injectable()
export default class SearchOneBookById {
  constructor(
    @Inject(BookRepositoryInterface)
    private bookRepository: BookRepository,
  ) {}

  async run(id: string): Promise<BookDto> {
    // TODO
    const book = await this.bookRepository.searchOneById(id);
    if (!book) {
      throw new NotFoundException();
    }
    return BookDto.fromEntity(book);
  }
}
