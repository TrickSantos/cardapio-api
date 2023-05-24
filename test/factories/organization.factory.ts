import {
    Organization,
    OrganizationProps,
} from '@domain/entities/organization/organization';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<OrganizationProps>;

export function makeOrganization(props: Override = {}): Organization {
    return new Organization({
        name: faker.company.name(),
        logo: faker.image.imageUrl(),
        isActive: true,
        ...props,
    });
}
