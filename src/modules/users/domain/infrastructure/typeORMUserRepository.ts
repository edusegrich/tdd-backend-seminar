import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../UserRepository';
import { UserEntity } from '../user.entity';
import { FindManyOptions, Repository } from 'typeorm';

export default class TypeORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<void> {
    await this.repository.insert(user);
  }

  async searchByCriteria(
    criteria?: FindManyOptions<UserEntity>,
  ): Promise<UserEntity[]> {
    return this.repository.find(criteria);
  }

  async searchOneById(id: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
