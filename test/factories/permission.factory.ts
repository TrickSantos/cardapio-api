import {
    Permission,
    PermissionProps,
} from '@domain/entities/user/permission/permission';

type Override = Partial<PermissionProps>;

export function makePermission(props: Override = {}): Permission {
    return new Permission({
        name: 'name',
        description: 'description',
        ...props,
    });
}
