import { Permission } from './permission';

describe('Permission', () => {
    it('should create a permission', () => {
        const permission = new Permission({
            name: 'name',
            description: 'description',
        });

        expect(permission).toBeDefined();
        expect(permission.id).toBeDefined();
    });

    it('should update a permission', () => {
        const permission = new Permission({
            name: 'name',
            description: 'description',
        });

        permission.update({
            name: 'new-name',
        });

        expect(permission.name).toBe('new-name');
    });
});
