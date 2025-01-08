import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticateUserUseCase } from '../../core/use-cases/users/authenticate-user.use-case';

/**
 * Authentication guard for GraphQL operations.
 * Validates user authentication via email header and attaches user to request context.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  /**
   * Validates the request authentication and attaches user to context.
   *
   * @param context - Execution context containing request details
   * @returns Promise resolving to boolean indicating if request is authorized
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    // Check for required authentication header
    const email = req.headers['x-user-email'];
    if (!email) {
      return false;
    }

    try {
      // Authenticate user and attach to request context
      const user = await this.authenticateUserUseCase.execute(email);
      req.user = user;
      return true;
    } catch {
      return false;
    }
  }
}
