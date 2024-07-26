import { FindManyOptions } from 'typeorm';
import { UserEntity } from './user.entity';

export const UserRepositoryInterface = Symbol();

export default interface UserRepository {
  create(user: UserEntity): Promise<void>;
  searchByCriteria(
    criteria?: FindManyOptions<UserEntity>,
  ): Promise<UserEntity[]>;
  searchOneById(id: string): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
}
