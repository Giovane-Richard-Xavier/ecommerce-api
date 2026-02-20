import { UserEntity } from 'src/user/entities/user.entity';

export interface UserToken {
  user: UserEntity;
  token: string;
}
