import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { Test } from '@nestjs/testing';
import { makePermission } from '@test/factories/permission.factory';
import { PermissionUseCaseModule } from '@useCases/permission/permission.module';
import { PermissionController } from './permission.controller';
import { PermissionNotFound } from '@useCases/errors/PermissionNotFound';

describe('Permission Controller', () => {
    let permissionController: PermissionController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [PermissionController],
            imports: [PermissionUseCaseModule],
        }).compile();

        permissionController =
            moduleRef.get<PermissionController>(PermissionController);
    });

    describe('defined', () => {
        it('should be defined', () => {
            expect(permissionController).toBeDefined();
        });
    });

    describe('listAll', () => {
        it('should return an array of permissions', async () => {
            const permissions = await permissionController.listAll();

            expect(permissions).toEqual([]);
        });
    });

    describe('create', () => {
        afterEach(async () => {
            const permissions = await permissionController.listAll();

            for (const permission of permissions) {
                await permissionController.delete(permission.id);
            }
        });

        it('should create a permission', async () => {
            const data = makePermission();

            await permissionController.create({
                name: data.name,
                description: data.description,
                isActive: data.isActive,
            });

            const permissions = await permissionController.listAll();

            expect(permissions).toHaveLength(1);
        });
    });

    describe('findById', () => {
        let permission: any;

        beforeEach(async () => {
            const data = makePermission();

            await permissionController.create({
                name: data.name,
                isActive: data.isActive,
                description: data.description,
            });

            const permissions = await permissionController.listAll();

            permission = permissions[0];
        });

        afterEach(async () => {
            await permissionController.delete(permission.id);
        });

        it('should return a permission', async () => {
            const find = await permissionController.findById(permission.id);

            expect(find.name).toEqual(permission.name);
        });

        it('should throw a NotFoundException', async () => {
            await expect(permissionController.findById('123')).rejects.toThrow(
                PermissionNotFound,
            );
        });
    });

    describe('update', () => {
        let permission: any;

        beforeEach(async () => {
            const data = makePermission();

            await permissionController.create({
                name: data.name,
                isActive: data.isActive,
                description: data.description,
            });

            const permissions = await permissionController.listAll();

            permission = permissions[0];
        });

        afterEach(async () => {
            await permissionController.delete(permission.id);
        });

        it('should update a permission', async () => {
            await permissionController.update(permission.id, {
                name: 'new name',
                isActive: false,
            });

            const find = await permissionController.findById(permission.id);

            expect(find.name).toEqual('new name');
            expect(find.isActive).toEqual(false);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                permissionController.update('123', {
                    name: 'new name',
                    isActive: false,
                }),
            ).rejects.toThrow('Permission not found');
        });
    });

    describe('delete', () => {
        let permission: any;

        beforeEach(async () => {
            const data = makePermission();

            await permissionController.create({
                name: data.name,
                isActive: data.isActive,
                description: data.description,
            });

            const permissions = await permissionController.listAll();

            permission = permissions[0];
        });

        it('should delete a permission', async () => {
            await permissionController.delete(permission.id);

            const permissions = await permissionController.listAll();

            expect(permissions).toHaveLength(0);
        });

        it('should throw a NotFoundException', async () => {
            await expect(permissionController.delete('123')).rejects.toThrow(
                'Permission not found',
            );
        });
    });
});
