import { Module } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { LoanRepositoryInterface } from './domain/loanRepository';
import TypeORMLoanRepository from './domain/infrastructure/typeORMLoanRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from './domain/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity])],
  providers: [
    {
      provide: LoanRepositoryInterface,
      useClass: TypeORMLoanRepository,
    },
  ],
  exports: [LoanRepositoryInterface],
  controllers: [LoansController],
})
export class LoansModule {}
