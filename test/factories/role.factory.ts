import { Role, RoleProps } from '@domain/entities/user/role/role';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<RoleProps>;

export function makeRole(props: Override = {}): Role {
    return new Role({
        name: faker.name.jobTitle(),
        description: faker.lorem.sentence(),
        ...props,
    });
}
