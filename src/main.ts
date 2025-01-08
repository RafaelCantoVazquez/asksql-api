import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'https://studio.apollographql.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-User-Email',
      'Apollo-Require-Preflight',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'Access-Control-Allow-Headers',
    ],
    exposedHeaders: ['Set-Cookie'],
  });

  const port = process.env.PORT || 8000;

  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
  logger.log(`📚 GraphQL Playground: ${await app.getUrl()}/graphql`);
}
bootstrap();
