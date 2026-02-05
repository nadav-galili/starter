export interface QueryOptions {
  where?: Record<string, unknown>;
  orderBy?: { field: string; direction: 'asc' | 'desc' };
  limit?: number;
  offset?: number;
}

export interface IDatabaseRepository<T> {
  create(collection: string, data: Omit<T, 'id'>): Promise<T>;
  read(collection: string, id: string): Promise<T | null>;
  update(collection: string, id: string, data: Partial<T>): Promise<T>;
  delete(collection: string, id: string): Promise<void>;
  list(collection: string, options?: QueryOptions): Promise<T[]>;
}
