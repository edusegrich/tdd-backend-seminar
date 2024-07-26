import { Inject, Injectable } from '@nestjs/common';
import BookRepository, {
  BookRepositoryInterface,
} from '../../domain/bookRepository';

@Injectable()
export default class DeleteBook {
  constructor(
    @Inject(BookRepositoryInterface)
    private bookRepository: BookRepository,
  ) {}

  async run(id: string): Promise<void> {
    // TODO
  }
}
