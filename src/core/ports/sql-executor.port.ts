export interface SQLExecutionResult {
  rows: string[][];
  error: string | null;
}

export interface ISQLExecutor {
  execute(sql: string, datasetName: string): Promise<SQLExecutionResult>;
}
