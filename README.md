<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

A GraphQL API built with NestJS that provides SQL query execution capabilities against predefined datasets. The API supports user management, query history tracking, and dataset exploration.

## Features

- GraphQL API with Apollo Server
- SQL query execution against mock datasets
- Query history tracking
- User management
- Dataset exploration
- SQL query validation
- Error handling and logging

## Project Structure

```
src/
├── core/                 # Core business logic
│   ├── entities/        # Domain entities
│   ├── interfaces/      # Repository interfaces
│   ├── ports/          # Port interfaces
│   ├── use-cases/      # Application use cases
│   └── dtos/           # Data transfer objects
├── infrastructure/      # External implementations
│   ├── adapters/       # External service adapters
│   ├── filters/        # Exception filters
│   ├── guards/         # Authentication guards
│   ├── modules/        # NestJS modules
│   └── services/       # Infrastructure services
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## GraphQL Playground

Once the application is running, you can access the GraphQL playground at:

```
http://localhost:8000/graphql
```

## Available Queries and Mutations

### Queries

- `currentUser`: Get the current authenticated user
- `datasets`: Get all available datasets
- `queryHistory`: Get SQL query execution history

### Mutations

- `executeQuery`: Execute a SQL query against a dataset

Example mutation:

```graphql
mutation ExecuteQuery($input: ExecuteQueryInput!) {
  executeQuery(input: $input) {
    rows
    error
  }
}
```

## Test Data

The application includes mock datasets for:

### Customers Table

```sql
CREATE TABLE customers (
  customerId INT,
  firstName VARCHAR,
  lastName VARCHAR,
  email VARCHAR,
  registrationDate DATE
);
```

### Orders Table

```sql
CREATE TABLE orders (
  orderId INT,
  customerId INT,
  orderDate DATE,
  totalAmount DECIMAL
);
```

## Running Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=8000                                  # Server port
FRONTEND_URL=http://localhost:3000         # CORS origin URL
```

## Security Features

- SQL query validation to prevent harmful queries
  - Only SELECT statements allowed
  - No DROP, DELETE, UPDATE, or INSERT statements
  - Queries must reference existing datasets
- CORS protection with configurable origin
- Input validation using class-validator
- GraphQL error handling and logging
- User authentication via email header

## API Authentication

The API uses a simple header-based authentication:

```
X-User-Email: user@example.com
```

## Error Handling

The API implements a global GraphQL exception filter that:

- Formats all errors consistently
- Logs errors with context
- Prevents sensitive information leakage
- Returns appropriate error messages to clients

## License

This project is [MIT licensed](LICENSE).
