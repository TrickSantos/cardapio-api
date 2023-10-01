import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserUseCaseModule } from '@useCases/user/user.module';
import { makeUser } from '@test/factories/user.factory';
import { makeContact } from '@test/factories/contact.factory';

describe('UsersController', () => {
    let userController: UsersController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            imports: [UserUseCaseModule],
        }).compile();

        userController = moduleRef.get<UsersController>(UsersController);
    });

    describe('defined', () => {
        it('should be defined', () => {
            expect(userController).toBeDefined();
        });
    });

    describe('listAll', () => {
        it('should return an array of users', async () => {
            const users = await userController.listAll();

            expect(users).toEqual([]);
        });
    });

    describe('create', () => {
        afterEach(async () => {
            const users = await userController.listAll();

            for (const user of users) {
                await userController.delete(user.id);
            }
        });

        it('should create a user', async () => {
            const data = makeUser();
            const dataContact = makeContact();

            await userController.create({
                username: data.username,
                email: data.email,
                contact: {
                    email: dataContact.email,
                    firstName: dataContact.firstName,
                    lastName: dataContact.lastName,
                    phone: dataContact.phone,
                },
                isActive: data.isActive,
                organizationId: data.organizationId,
                password: data.password,
                permissions: [],
                roles: [],
            });

            const users = await userController.listAll();

            expect(users).toHaveLength(1);
        });
    });

    describe('findById', () => {
        let user: any;

        beforeEach(async () => {
            const data = makeUser();
            const dataContact = makeContact();

            await userController.create({
                username: data.username,
                email: data.email,
                contact: {
                    email: dataContact.email,
                    firstName: dataContact.firstName,
                    lastName: dataContact.lastName,
                    phone: dataContact.phone,
                },
                isActive: data.isActive,
                organizationId: data.organizationId,
                password: data.password,
                permissions: [],
                roles: [],
            });

            const users = await userController.listAll();

            user = users[0];
        });

        afterEach(async () => {
            await userController.delete(user.id);
        });

        it('should return a user', async () => {
            const find = await userController.findById(user.id);

            expect(find).toEqual(user);
        });

        it('should throw a NotFoundException', async () => {
            await expect(userController.findById('123')).rejects.toThrow(
                'User not found',
            );
        });
    });

    describe('update', () => {
        let user: any;

        beforeEach(async () => {
            const data = makeUser();
            const dataContact = makeContact();

            await userController.create({
                username: data.username,
                email: data.email,
                contact: {
                    email: dataContact.email,
                    firstName: dataContact.firstName,
                    lastName: dataContact.lastName,
                    phone: dataContact.phone,
                },
                isActive: data.isActive,
                organizationId: data.organizationId,
                password: data.password,
                permissions: [],
                roles: [],
            });

            const users = await userController.listAll();

            user = users[0];
        });

        afterEach(async () => {
            await userController.delete(user.id);
        });

        it('should update a user', async () => {
            await userController.update(user.id, {
                email: 'new email',
                username: 'new username',
                isActive: false,
            });

            const find = await userController.findById(user.id);

            expect(find.email).toEqual('new email');
            expect(find.username).toEqual('new username');
            expect(find.isActive).toEqual(false);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                userController.update('123', {
                    email: 'new email',
                    username: 'new username',
                    isActive: false,
                }),
            ).rejects.toThrow('User not found');
        });
    });

    describe('delete', () => {
        let user: any;

        beforeEach(async () => {
            const data = makeUser();
            const dataContact = makeContact();

            await userController.create({
                username: data.username,
                email: data.email,
                contact: {
                    email: dataContact.email,
                    firstName: dataContact.firstName,
                    lastName: dataContact.lastName,
                    phone: dataContact.phone,
                },
                isActive: data.isActive,
                organizationId: data.organizationId,
                password: data.password,
                permissions: [],
                roles: [],
            });

            const users = await userController.listAll();

            user = users[0];
        });

        it('should delete a user', async () => {
            await userController.delete(user.id);

            const users = await userController.listAll();

            expect(users).toHaveLength(0);
        });

        it('should throw a NotFoundException', async () => {
            await expect(userController.delete('123')).rejects.toThrow(
                'User not found',
            );
        });
    });
});
