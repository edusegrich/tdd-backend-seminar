import { Test } from '@nestjs/testing';
import { BookRepositoryInterface } from 'src/modules/books/domain/bookRepository';
import BookRepositoryMock from '../../__mocks__/BookRepositoryMock';
import BookMother from '../../domain/bookMother';
import BorrowBook from 'src/modules/books/application/borrow/borrow';
import { LoanRepositoryInterface } from 'src/modules/loans/domain/loanRepository';
import { UserRepositoryInterface } from 'src/modules/users/domain/userRepository';
import UserRepositoryMock from '../../../users/__mocks__/UserRepositoryMock';
import UserMother from 'test/modules/users/domain/userMother';
import { FindManyOptions } from 'typeorm';
import { LoanEntity } from 'src/modules/loans/domain/loan.entity';
import LoanRepositoryMock from 'test/modules/loans/__mocks__/loanRepositoryMock';
import { ConflictException, ForbiddenException } from '@nestjs/common';

describe('Borrow Book Test Suite', () => {
  let borrowBook: BorrowBook;
  let bookRepository: BookRepositoryMock;
  let loanRepository: LoanRepositoryMock;
  let userRepository: UserRepositoryMock;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BookRepositoryInterface,
          useClass: BookRepositoryMock,
        },
        {
          provide: LoanRepositoryInterface,
          useClass: LoanRepositoryMock,
        },
        {
          provide: UserRepositoryInterface,
          useClass: UserRepositoryMock,
        },
        BorrowBook,
      ],
    }).compile();
    borrowBook = moduleRef.get(BorrowBook);
    bookRepository = moduleRef.get(BookRepositoryInterface);
    userRepository = moduleRef.get(UserRepositoryInterface);
    loanRepository = moduleRef.get(LoanRepositoryInterface);
  });

  it('Should borrow a book without errors', async () => {
    // Given
    const book = BookMother.random();
    const user = UserMother.client();
    const criteria: FindManyOptions<LoanEntity> = {
      where: {
        book: { id: book.id },
      },
    };
    userRepository.returnOnSearchOneById(user);
    bookRepository.returnOnSearchOneById(book);
    // When
    await borrowBook.run(user.id, book.id);
    // Then
    userRepository.assertSearchOneByIdCalledWith(user.id);
    loanRepository.assertSearchByCriteriaCalledWith(criteria);
    bookRepository.assertSearchOneByIdCalledWith(book.id);
    loanRepository.assertCreateCalled();
  });

  it('Should throw when user is librarian', async () => {
    // Given
    const book = BookMother.random();
    const user = UserMother.librarian();
    userRepository.returnOnSearchOneById(user);
    // When/Then
    await expect(borrowBook.run(user.id, book.id)).rejects.toThrow(
      ForbiddenException,
    );
    userRepository.assertSearchOneByIdCalledWith(user.id);
    loanRepository.assertSearchByCriteriaNotCalled();
    bookRepository.assertSearchOneByIdNotCalled();
    loanRepository.assertCreateNotCalled();
  });

  it('Should throw when book already on a loan', async () => {
    // Given
    const book = BookMother.random();
    const user = UserMother.client();
    const loan = new LoanEntity(user, book);
    const criteria: FindManyOptions<LoanEntity> = {
      where: {
        book: { id: book.id },
      },
    };
    userRepository.returnOnSearchOneById(user);
    loanRepository.returnOnSearchByCriteria([loan]);
    // When/Then
    await expect(borrowBook.run(user.id, book.id)).rejects.toThrow(
      ConflictException,
    );
    userRepository.assertSearchOneByIdCalledWith(user.id);
    loanRepository.assertSearchByCriteriaCalledWith(criteria);
    bookRepository.assertSearchOneByIdNotCalled();
    loanRepository.assertCreateNotCalled();
  });
});
