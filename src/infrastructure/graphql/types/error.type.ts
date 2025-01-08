import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Base GraphQL type for error responses.
 * Provides standard error information fields.
 */
@ObjectType('Error')
export class ErrorType {
  @Field()
  message: string;

  @Field()
  code: string;

  @Field()
  timestamp: string;
}

/**
 * Extended error type specific to SQL query execution errors.
 * Includes additional context about the failed query.
 */
@ObjectType('QueryError')
export class QueryErrorType extends ErrorType {
  @Field({ nullable: true })
  sql?: string;

  @Field({ nullable: true })
  dataset?: string;
}
