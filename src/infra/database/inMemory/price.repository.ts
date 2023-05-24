import { Price } from '@domain/entities/place/price/price';
import { PriceRepository } from '@domain/repositories/price.repository';

export class InMemoryPriceRepository extends PriceRepository {
    private price: Price[] = [];

    async create(price: Price): Promise<void> {
        this.price.push(price);
    }

    async update(price: Price): Promise<void> {
        const current = this.price.find((u) => u.id === price.id);
        if (current) {
            current.update(price);
        }
    }

    async findById(id: string): Promise<Price | null> {
        const price = this.price.find((price) => price.id === id);
        if (price) {
            return price;
        }
        return null;
    }

    async findAll(): Promise<Price[]> {
        return this.price.filter((price) => price.isActive);
    }

    async delete(id: string): Promise<void> {
        const current = this.price.find((price) => price.id === id);
        if (current) {
            current.update({ isActive: false });
        }
    }

    reset() {
        this.price = [];
    }
}
