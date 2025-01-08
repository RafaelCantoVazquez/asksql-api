import { Injectable } from '@nestjs/common';
import { Query } from '../../../../../core/entities/query.entity';
import { IQueryRepository } from '../../../../../core/interfaces/repositories/query.repository.interface';

/**
 * Mock implementation of a TypeORM repository for Query entities.
 * This repository simulates database operations with in-memory storage.
 */
@Injectable()
export class TypeOrmQueryRepository implements IQueryRepository {
  // In-memory storage for queries
  private queries: Query[] = [];

  /**
   * Saves a new query to the repository.
   *
   * @param query - The query to save
   * @returns Promise containing the saved query
   */
  async save(query: Query): Promise<Query> {
    this.queries.push(query);
    return query;
  }

  /**
   * Finds a query by its unique identifier.
   *
   * @param id - The unique identifier of the query
   * @returns Promise containing the found query or null if not found
   */
  async findById(id: string): Promise<Query | null> {
    return this.queries.find((query) => query.id === id) || null;
  }

  /**
   * Retrieves all queries associated with a specific user.
   *
   * @param userId - The unique identifier of the user
   * @returns Promise containing an array of queries
   */
  async findByUserId(userId: string): Promise<Query[]> {
    return this.queries.filter((query) => query.userId === userId);
  }

  /**
   * Retrieves all queries stored in the repository.
   *
   * @returns Promise containing an array of all queries
   */
  async findAll(): Promise<Query[]> {
    return this.queries;
  }
}
