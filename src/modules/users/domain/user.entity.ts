import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  type: 'client' | 'librarian';

  @Column()
  loans?: string[];

  constructor(data: {
    firstName: string;
    lastName: string;
    type: 'client' | 'librarian';
  }) {
    this.id = v4();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.type = data.type;
  }
}
