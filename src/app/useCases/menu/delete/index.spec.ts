import { Menu } from '@domain/entities/place/menu/menu';
import { InMemoryMenuRepository } from '@infra/database/inMemory/menu.repository';
import { makeMenu } from '@test/factories/menu.factory';
import { MenuNotFound } from '@useCases/errors/MenuNotFound';
import { describe, afterEach, it, expect } from 'vitest';
import { DeleteMenuUseCase } from '.';

describe('Delete Menu', () => {
    let menu: Menu;
    const repository = new InMemoryMenuRepository();
    const useCase = new DeleteMenuUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should delete a menu', async () => {
        menu = makeMenu();
        await repository.create(menu);
        await useCase.execute(menu.id);
        const menus = await repository.findAll();
        expect(menus).toHaveLength(0);
    });

    it('should throw an error if menu not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            MenuNotFound,
        );
    });
});
