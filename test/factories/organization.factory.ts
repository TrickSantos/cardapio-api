import {
    Organization,
    OrganizationProps,
} from '@domain/entities/organization/organization';
import { faker } from '@faker-js/faker';

type Override = Partial<OrganizationProps>;

export function makeOrganization(props: Override = {}): Organization {
    return new Organization({
        name: faker.company.name(),
        logo: faker.image.imageUrl(),
        isActive: true,
        ...props,
    });
}
