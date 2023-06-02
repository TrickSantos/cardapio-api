import { Menu } from '@domain/entities/place/menu/menu';
import { MenuRepository } from '@domain/repositories/menu.repository';
import { Injectable } from '@nestjs/common';
import { MenuNotFound } from '@useCases/errors/MenuNotFound';

@Injectable()
export class FindMenuByIdUseCase {
    constructor(private readonly menuRepository: MenuRepository) {}

    async execute(id: string): Promise<Menu> {
        const menu = await this.menuRepository.findById(id);
        if (menu) {
            return menu;
        } else {
            throw new MenuNotFound();
        }
    }
}
