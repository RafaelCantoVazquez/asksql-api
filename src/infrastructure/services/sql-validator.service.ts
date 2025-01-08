import { Injectable } from '@nestjs/common';
import { Dataset } from '../../core/entities/dataset.entity';

/**
 * Service responsible for validating SQL queries against security rules
 * and dataset constraints.
 */
@Injectable()
export class SQLValidatorService {
  /**
   * Validates a SQL query against security rules and dataset constraints.
   *
   * @param sql - The SQL query to validate
   * @param dataset - The dataset against which the query will be executed
   * @returns null if valid, error message string if invalid
   */
  validateQuery(sql: string, dataset: Dataset): string | null {
    const lowercaseSQL = sql.toLowerCase();

    // Ensure query contains SELECT statement
    if (!lowercaseSQL.includes('select')) {
      return 'Query must include SELECT statement';
    }

    // Prevent dangerous operations
    const dangerousOperations = ['drop', 'delete', 'update', 'insert'];
    if (dangerousOperations.some((op) => lowercaseSQL.includes(op))) {
      return 'Only SELECT queries are allowed';
    }

    // Ensure query references the correct table
    if (!lowercaseSQL.includes(dataset.name.toLowerCase())) {
      return `Query must reference the '${dataset.name}' table`;
    }

    return null;
  }
}
