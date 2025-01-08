import { Field, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL type representing a user in the system.
 * Contains basic user identification and contact information.
 */
@ObjectType('User')
export class UserType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
