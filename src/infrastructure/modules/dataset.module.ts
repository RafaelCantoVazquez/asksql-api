import { Module } from '@nestjs/common';
import { DatasetResolver } from '../graphql/resolvers/dataset.resolver';
import { GetDatasetsUseCase } from '../../core/use-cases/datasets/get-datasets.use-case';
import { TypeOrmDatasetRepository } from '../adapters/persistence/typeorm/repositories/dataset.repository';
import { SQLValidatorService } from '../services/sql-validator.service';
import { DATASET_REPOSITORY } from '../../core/interfaces/repositories/dataset.repository.interface';

/**
 * Module for dataset-related functionality.
 * Provides services and repositories for managing SQL datasets.
 *
 * Features:
 * - Dataset retrieval and management
 * - SQL query validation
 * - Dataset schema validation
 */
@Module({
  providers: [
    DatasetResolver,
    GetDatasetsUseCase,
    SQLValidatorService,
    {
      provide: DATASET_REPOSITORY,
      useClass: TypeOrmDatasetRepository,
    },
  ],
  exports: [SQLValidatorService, DATASET_REPOSITORY],
})
export class DatasetModule {}
