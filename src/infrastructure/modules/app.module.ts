/**
 * Root module of the application.
 * Configures global features and combines all feature modules.
 */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthController } from '../controllers/health.controller';
import { UserModule } from './user.module';
import { QueryModule } from './query.module';
import { DatasetModule } from './dataset.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      path: '/graphql',
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    QueryModule,
    DatasetModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
