import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExecuteQueryUseCase } from '../../../core/use-cases/queries/execute-query.use-case';
import { GetQueryHistoryUseCase } from '../../../core/use-cases/queries/get-query-history.use-case';
import { QueryResultType } from '../types/query-result.type';
import { QueryHistoryType } from '../types/query-history.type';
import { ExecuteQueryInput } from '../../../core/dtos/execute-query.dto';

/**
 * GraphQL resolver for SQL query-related operations.
 * Handles query execution and history retrieval.
 */
@Resolver()
export class QueryResolver {
  constructor(
    private readonly executeQueryUseCase: ExecuteQueryUseCase,
    private readonly getQueryHistoryUseCase: GetQueryHistoryUseCase,
  ) {}

  /**
   * Executes a SQL query against a specified dataset.
   * Handles error cases and returns either results or error information.
   *
   * @param input - The query execution input containing SQL and dataset information
   * @returns Promise containing query results or error details
   */
  @Mutation(() => QueryResultType)
  async executeQuery(
    @Args('input') input: ExecuteQueryInput,
  ): Promise<QueryResultType> {
    try {
      const result = await this.executeQueryUseCase.execute(
        input.sql,
        input.datasetName,
      );

      return {
        rows: result.rows,
        error: result.error,
      };
    } catch (error) {
      return {
        rows: [],
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  /**
   * Retrieves the history of executed queries.
   *
   * @returns Promise containing an array of historical queries
   */
  @Query(() => [QueryHistoryType])
  async queryHistory(): Promise<QueryHistoryType[]> {
    return this.getQueryHistoryUseCase.execute();
  }
}
