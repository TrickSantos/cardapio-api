import { describe, it, expect } from 'vitest';
import { makePlace } from '@test/factories/place.factory';

describe('Place', () => {
    it('should create an instance', () => {
        const place = makePlace();

        expect(place).toBeTruthy();
        expect(place.id).toBeDefined();
        expect(place.createdAt).toBeDefined();
    });
});
