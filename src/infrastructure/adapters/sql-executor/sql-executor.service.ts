import { Injectable } from '@nestjs/common';
import {
  ISQLExecutor,
  SQLExecutionResult,
} from '../../../core/ports/sql-executor.port';

/**
 * Service that simulates SQL query execution against mock datasets.
 * This implementation provides a simplified SQL execution environment
 * for development and testing purposes.
 */
@Injectable()
export class SQLExecutorService implements ISQLExecutor {
  // Mock data representing our test database tables
  private mockData = {
    customers: [
      {
        customerId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        registrationDate: '2024-01-01',
      },
      {
        customerId: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        registrationDate: '2024-01-02',
      },
    ],
    orders: [
      {
        orderId: 1,
        customerId: 1,
        orderDate: '2024-01-15',
        totalAmount: 100.5,
      },
      {
        orderId: 2,
        customerId: 2,
        orderDate: '2024-01-16',
        totalAmount: 200.75,
      },
    ],
  };

  /**
   * Executes a SQL query against a specified dataset.
   * Note: This is a mock implementation that returns predefined data.
   *
   * @param sql - The SQL query to execute (currently not parsed)
   * @param datasetName - Name of the dataset to query against
   * @returns Promise containing query results or error message
   */
  async execute(sql: string, datasetName: string): Promise<SQLExecutionResult> {
    // Simulate real database latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Get the mock data for the requested dataset
      const data = this.mockData[datasetName];

      if (!data) {
        return {
          rows: [],
          error: `Dataset '${datasetName}' not found in mock data`,
        };
      }

      // Convert all data to string format for consistent output
      const rows = data.map((row) => {
        return Object.values(row).map((value) => String(value));
      });

      // Add column headers as first row
      const columnNames = Object.keys(data[0] || {});
      rows.unshift(columnNames);

      return { rows, error: null };
    } catch (error) {
      return {
        rows: [],
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
