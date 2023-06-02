import { MenuRepository } from '@domain/repositories/menu.repository';
import { Injectable } from '@nestjs/common';
import { MenuNotFound } from '@useCases/errors/MenuNotFound';

type UpdateMenuDTO = {
    id: string;
    name?: string;
    description?: string;
    isActive?: boolean;
};

@Injectable()
export class UpdateMenuUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(data: UpdateMenuDTO) {
        const menu = await this.menuRepository.findById(data.id);
        if (menu) {
            menu.update({
                ...data,
            });
            return this.menuRepository.update(menu);
        } else {
            throw new MenuNotFound();
        }
    }
}
