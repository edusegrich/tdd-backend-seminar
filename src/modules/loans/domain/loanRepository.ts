import { FindManyOptions } from 'typeorm';
import { LoanEntity } from './loan.entity';

export const LoanRepositoryInterface = Symbol();

export default interface LoanRepository {
  create(loan: LoanEntity): Promise<void>;
  searchByCriteria(
    criteria?: FindManyOptions<LoanEntity>,
  ): Promise<LoanEntity[]>;
  searchOneById(id: string): Promise<LoanEntity | null>;
  delete(id: string): Promise<void>;
}
