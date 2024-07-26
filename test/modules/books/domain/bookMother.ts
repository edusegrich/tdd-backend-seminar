import { BookEntity } from 'src/modules/books/domain/book.entity';
import { faker } from '@faker-js/faker';

export default class BookMother {
  static create(data: {
    title: string;
    author: string;
    publishedDate: Date;
  }): BookEntity {
    return new BookEntity(data);
  }

  static random(): BookEntity {
    return this.create({
      title: faker.word.words(),
      author: faker.person.fullName(),
      publishedDate: faker.date.past(),
    });
  }
}
