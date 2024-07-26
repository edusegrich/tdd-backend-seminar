import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserRepositoryInterface } from './domain/userRepository';
import TypeORMUserRepository from './domain/infrastructure/typeORMUserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepositoryInterface,
      useClass: TypeORMUserRepository,
    },
  ],
  exports: [UserRepositoryInterface],
  controllers: [UsersController],
})
export class UsersModule {}
