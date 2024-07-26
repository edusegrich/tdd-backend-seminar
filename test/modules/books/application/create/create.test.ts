import { Test } from '@nestjs/testing';
import CreateBook from 'src/modules/books/application/create/create';
import { BookRepositoryInterface } from 'src/modules/books/domain/bookRepository';
import BookRepositoryMock from '../../__mocks__/BookRepositoryMock';
import BookMother from '../../domain/bookMother';
import { BookDto } from 'src/modules/books/application/searchByCriteria/book.dto';

describe('Create Book Test Suite', () => {
  let createBook: CreateBook;
  let bookRepository: BookRepositoryMock;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BookRepositoryInterface,
          useClass: BookRepositoryMock,
        },
        CreateBook,
      ],
    }).compile();
    createBook = moduleRef.get(CreateBook);
    bookRepository = moduleRef.get(BookRepositoryInterface);
  });

  it('Should create book without errors', async () => {
    // Given
    const book = BookMother.random();
    // When
    const dto = await createBook.run({ ...book });
    // Then
    book.id = dto.id;
    bookRepository.assertCreateCalledWith(book);
    expect(dto).toEqual(BookDto.fromEntity(book));
  });
});
