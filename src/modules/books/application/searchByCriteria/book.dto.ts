import { BookEntity } from '../../domain/book.entity';

export class BookDto implements BookEntity {
  public readonly id: string;

  public title: string;

  public author: string;

  public publishedDate: Date;

  constructor(book: BookEntity) {
    Object.assign(book);
    this.id = book.id;
  }

  static fromEntity(book: BookEntity): BookDto {
    return new BookDto(book);
  }
}
