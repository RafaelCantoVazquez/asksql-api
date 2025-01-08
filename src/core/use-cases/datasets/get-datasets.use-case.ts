import { Injectable, Inject } from '@nestjs/common';
import { Dataset } from '../../entities/dataset.entity';
import {
  IDatasetRepository,
  DATASET_REPOSITORY,
} from '../../interfaces/repositories/dataset.repository.interface';

@Injectable()
export class GetDatasetsUseCase {
  constructor(
    @Inject(DATASET_REPOSITORY)
    private readonly datasetRepository: IDatasetRepository,
  ) {}

  async execute(): Promise<Dataset[]> {
    return this.datasetRepository.findAll();
  }
}
