import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publishedDate: Date;
}
