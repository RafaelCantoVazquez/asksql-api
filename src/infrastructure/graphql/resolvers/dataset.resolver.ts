import { Query, Resolver } from '@nestjs/graphql';
import { GetDatasetsUseCase } from '../../../core/use-cases/datasets/get-datasets.use-case';
import { DatasetType } from '../types/dataset.type';

/**
 * GraphQL resolver for Dataset-related operations.
 * Handles queries for retrieving dataset information.
 */
@Resolver(() => DatasetType)
export class DatasetResolver {
  constructor(private readonly getDatasetsUseCase: GetDatasetsUseCase) {}

  /**
   * Retrieves all available datasets.
   * Converts domain Dataset entities to GraphQL DatasetType objects.
   *
   * @returns Promise containing an array of datasets
   */
  @Query(() => [DatasetType])
  async datasets(): Promise<DatasetType[]> {
    const datasets = await this.getDatasetsUseCase.execute();
    return datasets.map((dataset) => ({
      id: dataset.id,
      name: dataset.name,
      schema: JSON.stringify(dataset.schema),
    }));
  }
}
