import { User } from '../../entities/user.entity';

export const USER_REPOSITORY = 'UserRepository';

export interface IUserRepository {
  getCurrentUser(): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
