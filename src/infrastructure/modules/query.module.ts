import { Module } from '@nestjs/common';
import { QueryResolver } from '../graphql/resolvers/query.resolver';
import { ExecuteQueryUseCase } from '../../core/use-cases/queries/execute-query.use-case';
import { GetQueryHistoryUseCase } from '../../core/use-cases/queries/get-query-history.use-case';
import { TypeOrmQueryRepository } from '../adapters/persistence/typeorm/repositories/query.repository';
import { SQLExecutorService } from '../adapters/sql-executor/sql-executor.service';
import { DatasetModule } from './dataset.module';
import { QUERY_REPOSITORY } from '../../core/interfaces/repositories/query.repository.interface';
const SQL_EXECUTOR = 'SQL_EXECUTOR';

/**
 * Module for SQL query execution and history tracking.
 * Provides functionality for executing SQL queries against datasets
 * and maintaining a history of executed queries.
 *
 * Features:
 * - SQL query execution
 * - Query history tracking
 * - Query validation and security
 */
@Module({
  imports: [DatasetModule],
  providers: [
    QueryResolver,
    ExecuteQueryUseCase,
    GetQueryHistoryUseCase,
    {
      provide: QUERY_REPOSITORY,
      useClass: TypeOrmQueryRepository,
    },
    {
      provide: SQL_EXECUTOR,
      useClass: SQLExecutorService,
    },
  ],
  exports: [ExecuteQueryUseCase, GetQueryHistoryUseCase],
})
export class QueryModule {}
