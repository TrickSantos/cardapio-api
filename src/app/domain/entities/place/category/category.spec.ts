import { Category } from './category';

describe('Category', () => {
    it('should create an instance', () => {
        const category = new Category({
            name: 'test',
            placeId: 'test',
            isActive: true,
        });
        expect(category).toBeTruthy();
        expect(category.id).toBeDefined();
        expect(category.createdAt).toBeDefined();
    });
});
