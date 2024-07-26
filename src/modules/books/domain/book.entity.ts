import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

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

  constructor(data: { title: string; author: string; publishedDate: Date }) {
    this.id = v4();
    this.title = data.title;
    this.author = data.author;
    this.publishedDate = data.publishedDate;
  }
}
