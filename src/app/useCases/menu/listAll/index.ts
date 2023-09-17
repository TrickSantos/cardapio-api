import { Menu } from '@domain/entities/place/menu/menu';
import { MenuRepository } from '@domain/repositories/menu.repository';
import { Injectable } from '@nestjs/common';

type Payload = {
    placeId?: string;
    isActive?: boolean;
};
@Injectable()
export class ListAllMenusUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(payload?: Payload): Promise<Menu[]> {
        return this.menuRepository.findAll(payload);
    }
}
