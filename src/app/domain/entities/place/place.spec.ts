import { Place } from './place';

describe('Place', () => {
    it('should create an instance', () => {
        const place = new Place({
            organizationId: 'test',
            name: 'test',
            address: 'test',
            city: 'test',
            state: 'test',
            zip: 'test',
            phone: 'test',
            website: 'test',
            isActive: true,
        });

        expect(place).toBeTruthy();
        expect(place.id).toBeDefined();
        expect(place.createdAt).toBeDefined();
    });
});
