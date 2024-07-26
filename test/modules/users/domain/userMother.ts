import { UserEntity } from 'src/modules/users/domain/user.entity';
import { faker } from '@faker-js/faker';

export default class UserMother {
  static create(data: {
    firstName: string;
    lastName: string;
    type: 'client' | 'librarian';
  }): UserEntity {
    return new UserEntity(data);
  }

  static client(): UserEntity {
    return this.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      type: 'client',
    });
  }

  static librarian(): UserEntity {
    return this.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      type: 'librarian',
    });
  }
}
