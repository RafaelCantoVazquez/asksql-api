import { Query } from '../../entities/query.entity';

export const QUERY_REPOSITORY = 'QUERY_REPOSITORY';

export interface IQueryRepository {
  save(query: Query): Promise<Query>;
  findById(id: string): Promise<Query | null>;
  findByUserId(userId: string): Promise<Query[]>;
  findAll(): Promise<Query[]>;
}
