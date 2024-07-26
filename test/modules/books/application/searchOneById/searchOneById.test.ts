import { Test } from '@nestjs/testing';
import { BookRepositoryInterface } from 'src/modules/books/domain/bookRepository';
import BookRepositoryMock from '../../__mocks__/BookRepositoryMock';
import BookMother from '../../domain/bookMother';
import SearchOneBookById from 'src/modules/books/application/searchOneById/searchOneById';
import { faker } from '@faker-js/faker';
import { BookDto } from 'src/modules/books/application/searchByCriteria/book.dto';
import { NotFoundException } from '@nestjs/common';

describe('Search One Book Test Suite', () => {
  let searchOneBookById: SearchOneBookById;
  let bookRepository: BookRepositoryMock;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BookRepositoryInterface,
          useClass: BookRepositoryMock,
        },
        SearchOneBookById,
      ],
    }).compile();
    searchOneBookById = moduleRef.get(SearchOneBookById);
    bookRepository = moduleRef.get(BookRepositoryInterface);
  });

  it('Should return book without errors', async () => {
    // Given
    const book = BookMother.random();
    const bookId = faker.string.uuid();
    book.id = bookId;
    bookRepository.returnOnSearchOneById(book);
    // When
    const dto = await searchOneBookById.run(bookId);
    // Then
    bookRepository.assertSearchOneByIdCalledWith(bookId);
    expect(dto).toEqual(BookDto.fromEntity(book));
  });

  it('Should throw when book not found', async () => {
    // Given
    const book = BookMother.random();
    const bookId = faker.string.uuid();
    book.id = bookId;
    bookRepository.returnOnSearchOneById(null);
    // When/Then
    await expect(searchOneBookById.run(bookId)).rejects.toThrow(
      NotFoundException,
    );
    bookRepository.assertSearchOneByIdCalledWith(bookId);
  });
});
