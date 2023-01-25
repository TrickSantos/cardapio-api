import {
    Permission,
    PermissionProps,
} from '@domain/entities/user/permission/permission';
import { faker } from '@faker-js/faker';

type Override = Partial<PermissionProps>;

export function makePermission(props: Override = {}): Permission {
    return new Permission({
        name: faker.name.jobTitle(),
        description: faker.lorem.sentence(),
        ...props,
    });
}
