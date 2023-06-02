import { Menu } from '@domain/entities/place/menu/menu';
import { MenuRepository } from '@domain/repositories/menu.repository';
import { Injectable } from '@nestjs/common';

type CreateMenuDTO = {
    placeId: string;
    name: string;
    description: string;
};

@Injectable()
export class CreateMenuUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(data: CreateMenuDTO): Promise<void> {
        const menu = new Menu({
            placeId: data.placeId,
            name: data.name,
            description: data.description,
            isActive: true,
        });

        return this.menuRepository.create(menu);
    }
}
