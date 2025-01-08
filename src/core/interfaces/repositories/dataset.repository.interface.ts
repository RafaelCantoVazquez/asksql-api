import { Dataset } from '../../entities/dataset.entity';

export const DATASET_REPOSITORY = 'DATASET_REPOSITORY';

export interface IDatasetRepository {
  findAll(): Promise<Dataset[]>;
  findById(id: string): Promise<Dataset | null>;
  findByName(name: string): Promise<Dataset | null>;
  save(dataset: Dataset): Promise<Dataset>;
}
