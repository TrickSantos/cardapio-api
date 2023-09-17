import { Section } from '@domain/entities/place/section/section';
import { MenuRepository } from '@domain/repositories/menu.repository';
import { Injectable } from '@nestjs/common';
import { MenuNotFound } from '@useCases/errors/MenuNotFound';

type UpdateMenuDTO = {
    id: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    sections?: {
        name: string;
        categoryId: string;
    }[];
};

@Injectable()
export class UpdateMenuUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute({ sections, ...data }: UpdateMenuDTO) {
        const menu = await this.menuRepository.findById(data.id);

        if (!menu) throw new MenuNotFound();

        menu.update({
            ...data,
            ...(sections && {
                sections: sections.map(
                    (section) =>
                        new Section({
                            categoryId: section.categoryId,
                            name: section.name,
                            isActive: true,
                            menuId: menu.id,
                        }),
                ),
            }),
        });
        return this.menuRepository.update(menu);
    }
}
