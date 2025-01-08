import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { DatasetModule } from './infrastructure/modules/dataset.module';
import { QueryModule } from './infrastructure/modules/query.module';
import { UserModule } from './infrastructure/modules/user.module';
import { GraphQLExceptionFilter } from './infrastructure/filters/graphql-exception.filter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      path: '/graphql',
      context: ({ req, res }) => ({ req, res }),
    }),
    DatasetModule,
    QueryModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
  ],
})
export class AppModule {}
