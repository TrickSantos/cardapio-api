import { Menu } from '@domain/entities/place/menu/menu';
import { MenuRepository } from '@domain/repositories/menu.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllMenusUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(): Promise<Menu[]> {
        return this.menuRepository.findAll();
    }
}
