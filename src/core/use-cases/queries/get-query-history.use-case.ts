import { Injectable, Inject } from '@nestjs/common';
import { Query } from '../../entities/query.entity';
import {
  IQueryRepository,
  QUERY_REPOSITORY,
} from '../../interfaces/repositories/query.repository.interface';

@Injectable()
export class GetQueryHistoryUseCase {
  constructor(
    @Inject(QUERY_REPOSITORY)
    private readonly queryRepository: IQueryRepository,
  ) {}

  async execute(userId?: string): Promise<Query[]> {
    if (userId) {
      return this.queryRepository.findByUserId(userId);
    }
    return this.queryRepository.findAll();
  }
}
