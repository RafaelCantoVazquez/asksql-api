import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class ExecuteQueryInput {
  @Field()
  @IsNotEmpty({ message: 'SQL query cannot be empty' })
  @IsString({ message: 'SQL query must be a string' })
  sql: string;

  @Field()
  @IsNotEmpty({ message: 'Dataset name cannot be empty' })
  @IsString({ message: 'Dataset name must be a string' })
  datasetName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'User ID must be a string' })
  userId?: string;
}
