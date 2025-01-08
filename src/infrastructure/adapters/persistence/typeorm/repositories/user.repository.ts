import { Injectable } from '@nestjs/common';
import { User } from '../../../../../core/entities/user.entity';
import { IUserRepository } from '../../../../../core/interfaces/repositories/user.repository.interface';

/**
 * Mock implementation of a TypeORM repository for User entities.
 * This repository simulates database operations with a single mock user.
 */
@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  // Mock user data for development and testing
  private users: User[] = [new User('1', 'John Doe', 'john@example.com')];

  /**
   * Retrieves the current authenticated user.
   * Note: In this mock implementation, it always returns the first user.
   *
   * @returns Promise containing the current user
   */
  async getCurrentUser(): Promise<User> {
    return this.users[0];
  }

  /**
   * Finds a user by their email address.
   *
   * @param email - The email address to search for
   * @returns Promise containing the found user or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
