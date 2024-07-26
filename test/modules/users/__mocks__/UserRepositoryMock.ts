import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/domain/user.entity';
import UserRepository from 'src/modules/users/domain/UserRepository';
import { FindManyOptions } from 'typeorm';

@Injectable()
export default class UserRepositoryMock implements UserRepository {
  private createMock = jest.fn();
  private searchByCriteriaMock = jest.fn();
  private searchOneByIdMock = jest.fn();
  private deleteMock = jest.fn();

  public async create(user: UserEntity): Promise<void> {
    await this.createMock(user);
  }
  public assertCreateCalledWith(user: UserEntity): void {
    expect(this.createMock).toHaveBeenCalledWith(user);
  }

  public returnOnSearchByCriteria(user: UserEntity): void {
    this.searchByCriteriaMock.mockResolvedValue(user);
  }
  public async searchByCriteria(
    criteria?: FindManyOptions<UserEntity>,
  ): Promise<UserEntity[]> {
    return this.searchByCriteriaMock(criteria);
  }
  public assertSearchByCriteriaCalledWith(
    criteria?: FindManyOptions<UserEntity>,
  ): void {
    expect(this.searchByCriteriaMock).toHaveBeenCalledWith(criteria);
  }
  public assertSearchByCriteriaNotCalled(): void {
    expect(this.searchByCriteriaMock).not.toHaveBeenCalled();
  }

  public returnOnSearchOneById(user: UserEntity): void {
    this.searchOneByIdMock.mockResolvedValue(user);
  }
  public async searchOneById(id: string): Promise<UserEntity | null> {
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
