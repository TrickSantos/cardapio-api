import { Menu } from '@domain/entities/place/menu/menu';
import { InMemoryMenuRepository } from '@infra/database/inMemory/menu.repository';
import { makeMenu } from '@test/factories/menu.factory';
import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { ListAllMenusUseCase } from '.';

describe('List All Menus', () => {
    let menu: Menu;
    const repository = new InMemoryMenuRepository();
    const useCase = new ListAllMenusUseCase(repository);

    beforeEach(() => {
        Array.from({ length: 10 }).forEach(() => {
            menu = makeMenu();
            repository.create(menu);
        });
    });

    afterEach(() => {
        repository.reset();
    });

    it('should list all menus', async () => {
        const response = await useCase.execute();
        expect(response).toHaveLength(10);
    });
});
