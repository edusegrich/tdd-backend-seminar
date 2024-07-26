import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/modules/books/domain/book.entity';
import BookRepository from 'src/modules/books/domain/bookRepository';

@Injectable()
export default class BookRepositoryMock implements BookRepository {
  private createMock = jest.fn();
  private searchOneByIdMock = jest.fn();
  private deleteMock = jest.fn();

  public async create(book: BookEntity): Promise<void> {
    await this.createMock(book);
  }
  public assertCreateCalledWith(book: BookEntity): void {
    expect(this.createMock).toHaveBeenCalledWith(book);
  }

  public returnOnSearchOneById(book: BookEntity): void {
    this.searchOneByIdMock.mockResolvedValue(book);
  }
  public async searchOneById(id: string): Promise<BookEntity | null> {
    return this.searchOneByIdMock(id);
  }
  public assertSearchOneByIdCalledWith(id: string): void {
    expect(this.searchOneByIdMock).toHaveBeenCalledWith(id);
  }
  public assertSearchOneByIdNotCalled(): void {
    expect(this.searchOneByIdMock).not.toHaveBeenCalled();
  }

  public async delete(id: string): Promise<void> {
    await this.deleteMock(id);
  }
  public assertDeleteCalledWith(id: string): void {
    expect(this.deleteMock).toHaveBeenCalledWith(id);
  }
}
