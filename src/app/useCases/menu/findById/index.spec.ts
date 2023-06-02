import { Menu } from '@domain/entities/place/menu/menu';
import { InMemoryMenuRepository } from '@infra/database/inMemory/menu.repository';
import { makeMenu } from '@test/factories/menu.factory';
import { MenuNotFound } from '@useCases/errors/MenuNotFound';
import { describe, afterEach, beforeEach, it, expect } from 'vitest';
import { FindMenuByIdUseCase } from '.';

describe('FindMenuById', () => {
    let menu: Menu;
    const repository = new InMemoryMenuRepository();
    const useCase = new FindMenuByIdUseCase(repository);

    beforeEach(() => {
        menu = makeMenu();
        repository.create(menu);
    });

    afterEach(() => {
        repository.reset();
    });

    it('should find a menu by id', async () => {
        const response = await useCase.execute(menu.id);
        expect(response).toBeDefined();
        expect(response.id).toEqual(menu.id);
        expect(response.name).toEqual(menu.name);
    });

    it('should throw an error if menu not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(
            MenuNotFound,
        );
    });
});
