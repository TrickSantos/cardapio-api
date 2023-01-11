import { Menu } from './menu';

describe('Menu', () => {
    it('should create a valid menu', () => {
        const menu = new Menu({
            placeId: 'placeId',
            name: 'name',
            description: 'description',
            hasPromotion: false,
            sequence: ['sequence'],
            isActive: true,
        });

        expect(menu).toBeInstanceOf(Menu);
        expect(menu.id).toBeDefined();
        expect(menu.placeId).toBe('placeId');
        expect(menu.name).toBe('name');
        expect(menu.description).toBe('description');
        expect(menu.sequence).toEqual(['sequence']);
        expect(menu.isActive).toBe(true);
        expect(menu.createdAt).toBeInstanceOf(Date);
        expect(menu.updatedAt).toBeInstanceOf(Date);
    });
});
