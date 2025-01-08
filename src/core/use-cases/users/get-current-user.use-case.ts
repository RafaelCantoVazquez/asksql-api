import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../interfaces/repositories/user.repository.interface';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User> {
    return this.userRepository.getCurrentUser();
  }
}
