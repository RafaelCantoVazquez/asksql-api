import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities/user.entity';
import { IUserRepository } from '../../core/interfaces/repositories/user.repository.interface';

/**
 * Mock implementation of a user repository.
 * This repository provides a simplified user management system with a single mock user.
 */
@Injectable()
export class UserRepository implements IUserRepository {
  // Mock user for development and testing
  private readonly mockUser = User.create(
    'usr_123',
    'John Doe',
    'john@example.com',
  );

  /**
   * Retrieves the current authenticated user.
   * Note: In this mock implementation, it always returns the same mock user.
   *
   * @returns Promise containing the current user
   */
  async getCurrentUser(): Promise<User> {
    return this.mockUser;
  }

  /**
   * Finds a user by their email address.
   * Note: In this mock implementation, it only matches against the mock user.
   *
   * @param email - The email address to search for
   * @returns Promise containing the found user or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.mockUser.email === email ? this.mockUser : null;
  }
}
