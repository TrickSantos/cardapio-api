import { MenuRepository } from '@domain/repositories/menu.repository';
import { Injectable } from '@nestjs/common';
import { MenuNotFound } from '@useCases/errors/MenuNotFound';

@Injectable()
export class DeleteMenuUseCase {
    constructor(private menuRepository: MenuRepository) {}

    async execute(id: string) {
        const menu = await this.menuRepository.findById(id);
        if (menu) {
            return this.menuRepository.delete(id);
        } else {
            throw new MenuNotFound();
        }
    }
}
