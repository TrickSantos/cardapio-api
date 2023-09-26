import { afterEach, beforeEach, describe, it } from 'vitest';
import { RoleController } from './role.controller';
import { Test } from '@nestjs/testing';
import { RoleUseCaseModule } from '@useCases/role/role.module';
import { makeRole } from '@test/factories/role.factory';

describe('RoleController', () => {
    let roleController: RoleController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RoleController],
            imports: [RoleUseCaseModule],
        }).compile();

        roleController = moduleRef.get<RoleController>(RoleController);
    });

    describe('defined', () => {
        it('should be defined', () => {
            expect(roleController).toBeDefined();
        });
    });

    describe('listAll', () => {
        it('should return an array of roles', async () => {
            const roles = await roleController.listAll();

            expect(roles).toEqual([]);
        });
    });

    describe('create', () => {
        afterEach(async () => {
            const roles = await roleController.listAll();

            for (const role of roles) {
                await roleController.delete(role.id);
            }
        });

        it('should create a role', async () => {
            const data = makeRole();

            await roleController.create({
                name: data.name,
                isActive: data.isActive,
                description: data.description,
                permissions: [],
            });

            const roles = await roleController.listAll();

            expect(roles).toHaveLength(1);
        });
    });

    describe('addUsers', () => {
        let role: any;

        beforeEach(async () => {
            const data = makeRole();

            await roleController.create({
                name: data.name,
                description: data.description,
                permissions: [],
                isActive: data.isActive,
            });

            const roles = await roleController.listAll();

            role = roles[0];
        });

        afterEach(async () => {
            await roleController.delete(role.id);
        });

        it('should add users to a role', async () => {
            await roleController.addUsers(role.id, {
                users: [],
            });

            const find = await roleController.findById(role.id);

            expect(find.users).toHaveLength(0);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                roleController.addUsers('123', {
                    users: [],
                }),
            ).rejects.toThrow('Role not found');
        });
    });

    describe('findById', () => {
        let role: any;

        beforeEach(async () => {
            const data = makeRole();

            await roleController.create({
                name: data.name,
                description: data.description,
                permissions: [],
                isActive: data.isActive,
            });

            const roles = await roleController.listAll();

            role = roles[0];
        });

        afterEach(async () => {
            await roleController.delete(role.id);
        });

        it('should return a role', async () => {
            const find = await roleController.findById(role.id);

            expect(find).toEqual(role);
        });

        it('should throw a NotFoundException', async () => {
            await expect(roleController.findById('123')).rejects.toThrow(
                'Role not found',
            );
        });
    });

    describe('update', () => {
        let role: any;

        beforeEach(async () => {
            const data = makeRole();

            await roleController.create({
                name: data.name,
                description: data.description,
                permissions: [],
                isActive: data.isActive,
            });

            const roles = await roleController.listAll();

            role = roles[0];
        });

        afterEach(async () => {
            await roleController.delete(role.id);
        });

        it('should update a role', async () => {
            await roleController.update(role.id, {
                name: 'new name',
                isActive: false,
            });

            const find = await roleController.findById(role.id);

            expect(find.name).toEqual('new name');
            expect(find.isActive).toEqual(false);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                roleController.update('123', {
                    name: 'new name',
                    isActive: false,
                }),
            ).rejects.toThrow('Role not found');
        });
    });

    describe('delete', () => {
        let role: any;

        beforeEach(async () => {
            const data = makeRole();

            await roleController.create({
                name: data.name,
                description: data.description,
                permissions: [],
                isActive: data.isActive,
            });

            const roles = await roleController.listAll();

            role = roles[0];
        });

        it('should delete a role', async () => {
            await roleController.delete(role.id);

            const roles = await roleController.listAll();

            expect(roles).toHaveLength(0);
        });

        it('should throw a NotFoundException', async () => {
            await expect(roleController.delete('123')).rejects.toThrow(
                'Role not found',
            );
        });
    });
});
