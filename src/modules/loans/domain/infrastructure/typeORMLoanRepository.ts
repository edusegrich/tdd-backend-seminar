import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { LoanEntity } from '../loan.entity';
import LoanRepository from '../loanRepository';

export default class TypeORMLoanRepository implements LoanRepository {
  constructor(
    @InjectRepository(LoanEntity)
    private repository: Repository<LoanEntity>,
  ) {}

  async create(loan: LoanEntity): Promise<void> {
    await this.repository.insert(loan);
  }

  async searchByCriteria(
    criteria?: FindManyOptions<LoanEntity>,
  ): Promise<LoanEntity[]> {
    return this.repository.find(criteria);
  }

  async searchOneById(id: string): Promise<LoanEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
