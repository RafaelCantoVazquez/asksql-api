/**
 * Controller for health check endpoints.
 * Provides basic application status information for monitoring.
 */
import { Controller, Get, Head } from '@nestjs/common';

@Controller()
export class HealthController {
  /**
   * Handles HEAD requests to the root route.
   * Used by cloud platforms to check if the application is running.
   *
   * @returns Empty response with 200 status code
   */
  @Head()
  healthCheck() {
    return '';
  }

  /**
   * Handles GET requests to the root route.
   * Provides basic application status information.
   *
   * @returns Object containing application status
   */
  @Get()
  status() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
