import { randomUUID } from 'crypto';

export class Dataset {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly schema: Record<string, string>,
    public readonly createdAt: Date = new Date(),
  ) {}

  static create(name: string, schema: Record<string, string>): Dataset {
    return new Dataset(randomUUID(), name, schema);
  }
}
