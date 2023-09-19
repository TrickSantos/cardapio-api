import { NotFoundException } from '@nestjs/common';

export class RoleNotFound extends NotFoundException {
    constructor() {
        super('Role not found');
    }
}
