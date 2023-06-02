import { Menu } from '@domain/entities/place/menu/menu';
import { InMemoryMenuRepository } from '@infra/database/inMemory/menu.repository';
import { makeMenu } from '@test/factories/menu.factory';
import { describe, afterEach, it, expect } from 'vitest';
import { CreateMenuUseCase } from '.';

describe('Create Menu', () => {
    let menu: Menu;
    const repository = new InMemoryMenuRepository();
    const useCase = new CreateMenuUseCase(repository);

    afterEach(() => {
        repository.reset();
    });

    it('should create a menu', async () => {
        menu = makeMenu();
        await useCase.execute(menu);
        const menus = await repository.findAll();
        expect(menus).toHaveLength(1);
        expect(menus[0].name).toEqual(menu.name);
    });
});
