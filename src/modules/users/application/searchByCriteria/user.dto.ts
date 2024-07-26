import { UserEntity } from '../../domain/user.entity';

export class UserDto implements UserEntity {
  public readonly id: string;

  public firstName: string;

  public lastName: string;

  public type: 'client' | 'librarian';

  constructor(User: UserEntity) {
    Object.assign(User);
  }

  static fromEntity(User: UserEntity): UserDto {
    return new UserDto(User);
  }
}
