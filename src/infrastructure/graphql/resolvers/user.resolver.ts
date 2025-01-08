import { Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUserUseCase } from '../../../core/use-cases/users/get-current-user.use-case';
import { UserType } from '../types/user.type';

/**
 * GraphQL resolver for User-related operations.
 * Handles queries for retrieving user information.
 */
@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly getCurrentUserUseCase: GetCurrentUserUseCase) {}

  /**
   * Retrieves the currently authenticated user.
   *
   * @returns Promise containing the current user's information
   */
  @Query(() => UserType)
  async currentUser(): Promise<UserType> {
    const user = await this.getCurrentUserUseCase.execute();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
