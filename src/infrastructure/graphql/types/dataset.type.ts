import { Field, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL type representing a dataset.
 * Contains information about available data tables and their schemas.
 */
@ObjectType('Dataset')
export class DatasetType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  schema: string;
}
