import type { IDatabaseRepository, QueryOptions } from '../interfaces';

interface BaseEntity {
  id: string;
}

export class MockDatabaseRepository<T extends BaseEntity>
  implements IDatabaseRepository<T>
{
  private collections: Map<string, Map<string, T>> = new Map();
  private idCounter = 0;

  private getCollection(name: string): Map<string, T> {
    if (!this.collections.has(name)) {
      this.collections.set(name, new Map());
    }
    return this.collections.get(name)!;
  }

  async create(collection: string, data: Omit<T, 'id'>): Promise<T> {
    const id = `mock-${++this.idCounter}`;
    const entity = { ...data, id } as T;
    this.getCollection(collection).set(id, entity);
    return entity;
  }

  async read(collection: string, id: string): Promise<T | null> {
    return this.getCollection(collection).get(id) ?? null;
  }

  async update(collection: string, id: string, data: Partial<T>): Promise<T> {
    const col = this.getCollection(collection);
    const existing = col.get(id);
    if (!existing) {
      throw new Error(`Entity not found: ${id}`);
    }
    const updated = { ...existing, ...data, id } as T;
    col.set(id, updated);
    return updated;
  }

  async delete(collection: string, id: string): Promise<void> {
    this.getCollection(collection).delete(id);
  }

  async list(collection: string, options?: QueryOptions): Promise<T[]> {
    let items = Array.from(this.getCollection(collection).values());

    if (options?.orderBy) {
      const { field, direction } = options.orderBy;
      items.sort((a, b) => {
        const aVal = String((a as Record<string, unknown>)[field] ?? '');
        const bVal = String((b as Record<string, unknown>)[field] ?? '');
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    if (options?.offset) {
      items = items.slice(options.offset);
    }

    if (options?.limit) {
      items = items.slice(0, options.limit);
    }

    return items;
  }
}
