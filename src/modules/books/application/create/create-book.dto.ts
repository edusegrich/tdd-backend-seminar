import { BookDto } from '../searchByCriteria/book.dto';

export class CreateBookDto
  implements Pick<BookDto, 'title' | 'author' | 'publishedDate'>
{
  public title: string;

  public author: string;

  public publishedDate: Date;
}
