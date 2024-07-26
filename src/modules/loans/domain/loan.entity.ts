import { BookEntity } from 'src/modules/books/domain/book.entity';
import { UserEntity } from 'src/modules/users/domain/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('loans')
export class LoanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.loans, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => BookEntity, { eager: true })
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;

  @Column({ type: 'date' })
  loanDate: string;

  @Column({ type: 'date', nullable: true })
  returnDate: string;

  constructor(user: UserEntity, book: BookEntity) {
    this.user = user;
    this.book = book;
  }
}
