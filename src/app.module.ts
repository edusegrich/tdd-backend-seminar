import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';
import { LoansModule } from './modules/loans/loans.module';

@Module({
  imports: [BooksModule, UsersModule, LoansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
