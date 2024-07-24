import { BookEntity } from '../../domain/book.entity';

export class BookDto implements BookEntity {
  public readonly id: string;

  public title: string;

  public author: string;

  public publishedDate: Date;
}
