import { Menu } from '@domain/entities/place/menu/menu';
import { Section } from '@domain/entities/place/section/section';
import { MenuRepository } from '@domain/repositories/menu.repository';
import { Injectable } from '@nestjs/common';

type CreateMenuDTO = {
    placeId: string;
    name: string;
    description: string;
    sections: {
        name: string;
        categoryId: string;
    }[];
};

@Injectable()
export class CreateMenuUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute({ sections, ...data }: CreateMenuDTO): Promise<void> {
        const menu = new Menu({
            placeId: data.placeId,
            name: data.name,
            description: data.description,
            isActive: true,
        });

        menu.update({
            sections: sections.map(
                (section) =>
                    new Section({
                        categoryId: section.categoryId,
                        name: section.name,
                        isActive: true,
                        menuId: menu.id,
                    }),
            ),
        });

        return this.menuRepository.create(menu);
    }
}
