import { Section } from '@domain/entities/place/section/section';

export abstract class SectionRepository {
    abstract create(menu: Section): Promise<void>;
    abstract update(menu: Section): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Section | null>;
    abstract findAll(): Promise<Section[]>;
}
