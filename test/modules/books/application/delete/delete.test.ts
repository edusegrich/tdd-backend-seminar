import { Test } from '@nestjs/testing';
import { BookRepositoryInterface } from 'src/modules/books/domain/bookRepository';
import BookRepositoryMock from '../../__mocks__/BookRepositoryMock';
import DeleteBook from 'src/modules/books/application/delete/delete';
import { faker } from '@faker-js/faker';

describe('Delete Book Test Suite', () => {
  let deleteBook: DeleteBook;
  let bookRepository: BookRepositoryMock;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BookRepositoryInterface,
          useClass: BookRepositoryMock,
        },
        DeleteBook,
      ],
    }).compile();
    deleteBook = moduleRef.get(DeleteBook);
    bookRepository = moduleRef.get(BookRepositoryInterface);
  });

  it('Should delete book without errors', async () => {
    // Given
    const bookId = faker.string.uuid();
    // When
    await deleteBook.run(bookId);
    // Then
    bookRepository.assertDeleteCalledWith(bookId);
  });
});
