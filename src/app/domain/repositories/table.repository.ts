import { Table } from '@domain/entities/place/table/table';

export abstract class TableRepository {
    abstract create(table: Table): Promise<void>;
    abstract update(table: Table): Promise<void>;
    abstract delete(table: Table): Promise<void>;
    abstract findById(id: string): Promise<Table | null>;
    abstract findAll(): Promise<Table[]>;
}
