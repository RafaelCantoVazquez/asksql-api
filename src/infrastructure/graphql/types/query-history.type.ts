import { Field, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL type representing a historical query execution.
 * Contains information about previously executed SQL queries.
 */
@ObjectType('QueryHistory')
export class QueryHistoryType {
  @Field()
  id: string;

  @Field()
  sql: string;

  @Field()
  datasetName: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  userId?: string;
}
