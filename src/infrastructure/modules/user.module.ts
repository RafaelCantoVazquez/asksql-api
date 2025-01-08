import { Module } from '@nestjs/common';
import { UserResolver } from '../graphql/resolvers/user.resolver';
import { GetCurrentUserUseCase } from '../../core/use-cases/users/get-current-user.use-case';
import { UserRepository } from '../repositories/user.repository';
import { USER_REPOSITORY } from '../../core/interfaces/repositories/user.repository.interface';

/**
 * Module for user management functionality.
 * Handles user authentication, retrieval, and profile management.
 *
 * Features:
 * - User authentication
 * - User profile management
 * - Current user context
 *
 * Note: Currently uses a mock repository for development purposes.
 * Replace with actual implementation for production use.
 */
@Module({
  providers: [
    UserResolver,
    GetCurrentUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
