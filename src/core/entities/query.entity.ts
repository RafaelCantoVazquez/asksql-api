import { randomUUID } from 'crypto';

export class Query {
  constructor(
    public readonly id: string,
    public readonly sql: string,
    public readonly datasetName: string,
    public readonly userId?: string,
    public readonly createdAt: Date = new Date(),
  ) {}

  static create(sql: string, datasetName: string, userId?: string): Query {
    return new Query(randomUUID(), sql, datasetName, userId);
  }
}
