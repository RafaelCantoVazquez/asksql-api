import { Field, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL type representing the result of a SQL query execution.
 * Contains either the result rows or error information.
 */
@ObjectType('QueryResult')
export class QueryResultType {
  @Field(() => [[String]], { nullable: 'items' })
  rows: string[][];

  @Field(() => String, { nullable: true })
  error?: string | null;
}
