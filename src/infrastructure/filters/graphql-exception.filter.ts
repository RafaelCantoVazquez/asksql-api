import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

/**
 * Global exception filter for GraphQL operations.
 * Handles all unhandled exceptions in GraphQL resolvers and formats them
 * into a consistent error response structure.
 */
@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  /**
   * Catches and formats exceptions from GraphQL operations.
   *
   * @param exception - The thrown exception
   * @param host - Arguments host containing request context
   * @returns Formatted error response
   */
  catch(exception: Error, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();

    // Log error with relevant context for debugging
    console.error('GraphQL Error:', {
      error: exception.message,
      stack: exception.stack,
      context: {
        user: context.req?.user?.id,
        operation: context.req?.body?.operationName,
      },
    });

    // Return a standardized error response
    return {
      message: exception.message,
      code: exception.constructor.name,
      timestamp: new Date().toISOString(),
    };
  }
}
