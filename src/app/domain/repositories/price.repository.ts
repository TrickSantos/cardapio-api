import { Price } from '@domain/entities/place/price/price';

export abstract class PriceRepository {
    abstract create(price: Price): Promise<void>;
    abstract update(price: Price): Promise<void>;
    abstract delete(price: Price): Promise<void>;
    abstract findById(id: string): Promise<Price | null>;
    abstract findAll(): Promise<Price[]>;
}
