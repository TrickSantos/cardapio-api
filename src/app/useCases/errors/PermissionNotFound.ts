import { NotFoundException } from '@nestjs/common';

export class PermissionNotFound extends NotFoundException {
    constructor() {
        super('Permission not found');
    }
}
