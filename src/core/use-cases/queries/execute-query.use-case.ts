import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Query } from '../../entities/query.entity';
import { IQueryRepository } from '../../interfaces/repositories/query.repository.interface';
import {
  IDatasetRepository,
  DATASET_REPOSITORY,
} from '../../interfaces/repositories/dataset.repository.interface';
import {
  ISQLExecutor,
  SQLExecutionResult,
} from '../../ports/sql-executor.port';
import { SQLValidatorService } from '../../../infrastructure/services/sql-validator.service';

@Injectable()
export class ExecuteQueryUseCase {
  constructor(
    @Inject('QUERY_REPOSITORY')
    private readonly queryRepository: IQueryRepository,
    @Inject(DATASET_REPOSITORY)
    private readonly datasetRepository: IDatasetRepository,
    @Inject('SQL_EXECUTOR')
    private readonly sqlExecutor: ISQLExecutor,
    private readonly sqlValidator: SQLValidatorService,
  ) {}

  async execute(
    sql: string,
    datasetName: string,
    userId?: string,
  ): Promise<SQLExecutionResult> {
    const dataset = await this.datasetRepository.findByName(datasetName);
    if (!dataset) {
      throw new BadRequestException(`Dataset '${datasetName}' not found`);
    }

    const validationError = this.sqlValidator.validateQuery(sql, dataset);
    if (validationError) {
      throw new BadRequestException(validationError);
    }

    const query = Query.create(sql, datasetName, userId);
    await this.queryRepository.save(query);

    try {
      return await this.sqlExecutor.execute(sql, datasetName);
    } catch (error) {
      throw new BadRequestException(`Query execution failed: ${error.message}`);
    }
  }
}
