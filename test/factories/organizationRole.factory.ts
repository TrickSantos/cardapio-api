import { Role, RoleProps } from '@domain/entities/organization/role/role';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<RoleProps>;

export function makeOrganizationRole(props: Override = {}): Role {
    return new Role({
        name: faker.name.jobTitle(),
        description: faker.name.jobDescriptor(),
        isActive: faker.datatype.boolean(),
        organizationId: faker.datatype.uuid(),
        ...props,
    });
}
