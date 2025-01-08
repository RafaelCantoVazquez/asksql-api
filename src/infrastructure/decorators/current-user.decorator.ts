import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Parameter decorator that extracts the authenticated user from the GraphQL context.
 * Used to inject the current user into resolver methods.
 *
 * Example usage:
 * ```typescript
 * @Query()
 * async someQuery(@CurrentUser() user: User) {
 *   // user is the authenticated user from the request context
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
