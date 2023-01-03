import { Role, RoleProps } from '@domain/entities/user/role/role';

type Override = Partial<RoleProps>;

export function makeRole(props: Override = {}): Role {
    return new Role({
        name: 'name',
        description: 'description',
        ...props,
    });
}
