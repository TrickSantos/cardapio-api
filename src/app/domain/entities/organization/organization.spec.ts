import { describe, it, expect } from 'vitest';
import { Organization } from './organization';

describe('Organization', () => {
    it('should be able to create a organization', () => {
        const organization = new Organization({
            name: 'Organization 1',
            logo: 'https://logo',
            isActive: true,
        });
        expect(organization).toBeTruthy();
        expect(organization.id).toBeDefined();
    });

    it('should be able to update a organization', () => {
        const organization = new Organization({
            name: 'Organization 1',
            logo: 'https://logo',
            isActive: true,
        });
        organization.update({
            name: 'Organization 2',
            logo: 'https://logo2',
            isActive: false,
        });
        expect(organization.name).toBe('Organization 2');
        expect(organization.logo).toBe('https://logo2');
        expect(organization.isActive).toBe(false);
    });

    it('should be able to return a organization data like a JSON', () => {
        const organization = new Organization({
            name: 'Organization 1',
            logo: 'https://logo',
            isActive: true,
        });

        const organizationJSON = organization.toJSON();
        expect(organizationJSON).toEqual({
            id: organization.id,
            name: 'Organization 1',
            logo: 'https://logo',
            isActive: true,
            createdAt: organization.createdAt,
            updatedAt: organization.updatedAt,
        });
    });
});
