import { Menu } from '@domain/entities/place/menu/menu';
import { InMemoryMenuRepository } from '@infra/database/inMemory/menu.repository';
import { makeMenu } from '@test/factories/menu.factory';
import { MenuNotFound } from '@useCases/errors/MenuNotFound';
import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { UpdateMenuUseCase } from '.';

describe('Update Menu', () => {
    let menu: Menu;
    const repository = new InMemoryMenuRepository();
    const useCase = new UpdateMenuUseCase(repository);

    beforeEach(() => {
        menu = makeMenu();
        repository.create(menu);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should update a menu', async () => {
        const updatedMenu = makeMenu();
        await useCase.execute({
            id: menu.id,
            name: updatedMenu.name,
        });
        const foundMenu = await repository.findById(menu.id);
        expect(foundMenu).toBeDefined();
        expect(foundMenu?.name).toEqual(updatedMenu.name);
    });

    it('should throw an error if menu not found', async () => {
        await expect(
            useCase.execute({ ...makeMenu(), id: 'invalid-id' }),
        ).rejects.toThrow(MenuNotFound);
    });
});
