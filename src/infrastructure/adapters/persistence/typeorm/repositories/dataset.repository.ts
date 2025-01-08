import { Injectable } from '@nestjs/common';
import { Dataset } from '../../../../../core/entities/dataset.entity';
import { IDatasetRepository } from '../../../../../core/interfaces/repositories/dataset.repository.interface';

/**
 * Mock implementation of a TypeORM repository for Dataset entities.
 * This repository simulates database operations with in-memory data.
 */
@Injectable()
export class TypeOrmDatasetRepository implements IDatasetRepository {
  // Mock data representing predefined datasets with their schemas
  private readonly mockDatasets: Dataset[] = [
    new Dataset('1', 'customers', {
      customerId: 'INT',
      firstName: 'VARCHAR',
      lastName: 'VARCHAR',
      email: 'VARCHAR',
      registrationDate: 'DATE',
    }),
    new Dataset('2', 'orders', {
      orderId: 'INT',
      customerId: 'INT',
      orderDate: 'DATE',
      totalAmount: 'DECIMAL',
    }),
  ];

  /**
   * Retrieves all available datasets.
   * @returns Promise containing an array of all datasets
   */
  async findAll(): Promise<Dataset[]> {
    return this.mockDatasets;
  }

  /**
   * Finds a dataset by its unique identifier.
   * @param id - The unique identifier of the dataset
   * @returns Promise containing the found dataset or null if not found
   */
  async findById(id: string): Promise<Dataset | null> {
    return this.mockDatasets.find((dataset) => dataset.id === id) || null;
  }

  /**
   * Finds a dataset by its name.
   * @param name - The name of the dataset to find
   * @returns Promise containing the found dataset or null if not found
   */
  async findByName(name: string): Promise<Dataset | null> {
    return this.mockDatasets.find((dataset) => dataset.name === name) || null;
  }

  /**
   * Saves a dataset to the repository.
   * Note: In this mock implementation, it simply returns the dataset without storing it.
   *
   * @param dataset - The dataset to save
   * @returns Promise containing the saved dataset
   */
  async save(dataset: Dataset): Promise<Dataset> {
    return dataset;
  }
}
