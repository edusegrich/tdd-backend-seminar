import { Injectable } from '@nestjs/common';
import { LoanEntity } from 'src/modules/loans/domain/loan.entity';
import LoanRepository from 'src/modules/loans/domain/LoanRepository';
import { FindManyOptions } from 'typeorm';

@Injectable()
export default class LoanRepositoryMock implements LoanRepository {
  private createMock = jest.fn();
  private searchByCriteriaMock = jest.fn();
  private searchOneByIdMock = jest.fn();
  private deleteMock = jest.fn();

  public async create(loan: LoanEntity): Promise<void> {
    await this.createMock(loan);
  }
  public assertCreateCalled(): void {
    expect(this.createMock).toHaveBeenCalled();
  }
  public assertCreateCalledWith(loan: LoanEntity): void {
    expect(this.createMock).toHaveBeenCalledWith(loan);
  }
  public assertCreateNotCalled(): void {
    expect(this.createMock).not.toHaveBeenCalled();
  }

  public returnOnSearchByCriteria(loans: LoanEntity[]): void {
    this.searchByCriteriaMock.mockResolvedValue(loans);
  }
  public async searchByCriteria(
    criteria?: FindManyOptions<LoanEntity>,
  ): Promise<LoanEntity[]> {
    return this.searchByCriteriaMock(criteria);
  }
  public assertSearchByCriteriaCalledWith(
    criteria?: FindManyOptions<LoanEntity>,
  ): void {
    expect(this.searchByCriteriaMock).toHaveBeenCalledWith(criteria);
  }
  public assertSearchByCriteriaNotCalled(): void {
    expect(this.searchByCriteriaMock).not.toHaveBeenCalled();
  }

  public returnOnSearchOneById(loan: LoanEntity): void {
    this.searchOneByIdMock.mockResolvedValue(loan);
  }
  public async searchOneById(id: string): Promise<LoanEntity | null> {
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
