import { Menu } from '@domain/entities/place/menu/menu';

export type FindAllPayload = {
    placeId?: string;
    isActive?: boolean;
};

export abstract class MenuRepository {
    abstract create(menu: Menu): Promise<void>;
    abstract update(menu: Menu): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Menu | null>;
    abstract findAll(props?: FindAllPayload): Promise<Menu[]>;
}
