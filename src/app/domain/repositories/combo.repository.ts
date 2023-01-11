import { Combo } from '@domain/entities/place/combo/combo';

export abstract class ComboRepository {
    abstract create(combo: Combo): Promise<void>;
    abstract update(combo: Combo): Promise<void>;
    abstract delete(combo: Combo): Promise<void>;
    abstract findById(id: string): Promise<Combo>;
    abstract findAll(): Promise<Combo[]>;
}
