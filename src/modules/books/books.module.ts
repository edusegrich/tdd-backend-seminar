import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansModule } from '../loans/loans.module';
import { BookEntity } from './domain/book.entity';
import { BookRepositoryInterface } from './domain/bookRepository';
import TypeORMBookRepository from './domain/infrastructure/typeORMBookRepository';
import { UsersModule } from '../users/users.module';
import BorrowBook from './application/borrow/borrow';
import CreateBook from './application/create/create';
import DeleteBook from './application/delete/delete';
import SearchOneBookById from './application/searchOneById/searchOneById';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), LoansModule, UsersModule],
  providers: [
    {
      provide: BookRepositoryInterface,
      useClass: TypeORMBookRepository,
    },
    CreateBook,
    DeleteBook,
    SearchOneBookById,
    BorrowBook,
  ],
  exports: [BookRepositoryInterface, BorrowBook],
  controllers: [BooksController],
})
export class BooksModule {}
