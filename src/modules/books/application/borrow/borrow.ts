import { Inject, Injectable } from '@nestjs/common';
import UserRepository, {
  UserRepositoryInterface,
} from 'src/modules/users/domain/userRepository';
import LoanRepository, {
  LoanRepositoryInterface,
} from 'src/modules/loans/domain/loanRepository';
import BookRepository, {
  BookRepositoryInterface,
} from '../../domain/bookRepository';

@Injectable()
export default class BorrowBook {
  constructor(
    @Inject(BookRepositoryInterface)
    private bookRepository: BookRepository,
    @Inject(LoanRepositoryInterface)
    private loanRepository: LoanRepository,
    @Inject(UserRepositoryInterface)
    private userRepository: UserRepository,
  ) {}

  async run(userId: string, bookId: string): Promise<void> {
    // TODO
  }
}
