import { beforeAll, describe, it, expect, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserUseCaseModule } from '@useCases/user/user.module';
import { makeUser } from '@test/factories/user.factory';
import { makeContact } from '@test/factories/contact.factory';
import { ListAllUsersUseCase } from '@useCases/user/listAll';
import { CreateUserUseCase } from '@useCases/user/create';
import { DeleteUserUseCase } from '@useCases/user/delete';
import { FindUserByIdUseCase } from '@useCases/user/findById';
import { UpdateUserUseCase } from '@useCases/user/update';
import { User } from '@domain/entities/user/user';
import { UserNotFound } from '@useCases/errors/UserNotFound';
import { AuthModule } from '@useCases/authentication/authentication.module';

describe('UsersController', () => {
    let user: User;
    let userController: UsersController;
    let createUser: CreateUserUseCase,
        listAllUsers: ListAllUsersUseCase,
        findUserById: FindUserByIdUseCase,
        updateUser: UpdateUserUseCase,
        deleteUser: DeleteUserUseCase,
        authModule: AuthModule;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            imports: [UserUseCaseModule, AuthModule],
        }).compile();

        user = await makeUser();
        userController = moduleRef.get<UsersController>(UsersController);
        createUser = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
        listAllUsers = moduleRef.get<ListAllUsersUseCase>(ListAllUsersUseCase);
        findUserById = moduleRef.get<FindUserByIdUseCase>(FindUserByIdUseCase);
        updateUser = moduleRef.get<UpdateUserUseCase>(UpdateUserUseCase);
        deleteUser = moduleRef.get<DeleteUserUseCase>(DeleteUserUseCase);
    });

    describe('defined', () => {
        it('should be defined', () => {
            expect(userController).toBeDefined();
        });
    });

    describe('listAll', () => {
        it('should call listAll without params', async () => {
            const mock = vi.fn().mockImplementation(() => Promise.resolve([]));
            const spy = vi.spyOn(listAllUsers, 'execute');
            spy.mockImplementation(mock);

            await userController.listAll();

            expect(spy).toHaveBeenCalled();
        });

        it('should call listAll with params', async () => {
            const mock = vi.fn().mockImplementation(() => Promise.resolve([]));
            const spy = vi.spyOn(listAllUsers, 'execute');
            spy.mockImplementation(mock);

            await userController.listAll({
                limit: 10,
                offset: 0,
            });

            expect(spy).toHaveBeenCalledWith({
                limit: 10,
                offset: 0,
            });
        });
    });

    describe('create', () => {
        it('should be called without roles', async () => {
            const spy = vi.spyOn(createUser, 'execute');
            spy.mockImplementation(async () => Promise.resolve());

            const data = await makeUser();
            const contact = makeContact({
                userId: data.id,
            });

            await userController.create({
                username: data.username,
                email: data.email,
                contact: {
                    email: contact.email,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phone: contact.phone,
                },
                isActive: data.isActive,
                organizationId: data.organizationId,
                password: data.password,
                permissions: [],
                roles: [],
            });

            expect(spy).toHaveBeenCalledWith({
                username: data.username,
                email: data.email,
                contact: {
                    email: contact.email,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phone: contact.phone,
                },
                isActive: data.isActive,
                organizationId: data.organizationId,
                password: data.password,
                permissions: [],
                roles: [],
            });
        });
    });

    describe('findById', () => {
        it('should return a user', async () => {
            const spy = vi.spyOn(findUserById, 'execute');
            spy.mockImplementation(async () => Promise.resolve(user));

            const data = await userController.findById(user.id);

            expect(data).toEqual(user.toJSON());
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(findUserById, 'execute');
            spy.mockImplementation(async () => {
                throw new UserNotFound();
            });

            await expect(userController.findById(user.id)).rejects.toThrow(
                UserNotFound,
            );
        });
    });

    describe('update', () => {
        it('should be called with a body', async () => {
            const spy = vi.spyOn(updateUser, 'execute');
            spy.mockImplementation(async () => Promise.resolve());

            await userController.update(user.id, {
                email: 'new email',
                username: 'new username',
                isActive: false,
            });

            expect(spy).toHaveBeenCalledWith({
                id: user.id,
                email: 'new email',
                username: 'new username',
                isActive: false,
            });
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(updateUser, 'execute');
            spy.mockImplementation(async () => {
                throw new UserNotFound();
            });

            await expect(
                userController.update(user.id, {
                    email: 'new email',
                    username: 'new username',
                    isActive: false,
                }),
            ).rejects.toThrow(UserNotFound);
        });
    });

    describe('delete', () => {
        it('should be called with a id', async () => {
            const spy = vi.spyOn(deleteUser, 'execute');
            spy.mockImplementation(async () => Promise.resolve());

            await userController.delete(user.id);

            expect(spy).toHaveBeenCalledWith(user.id);
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(deleteUser, 'execute');
            spy.mockImplementation(async () => {
                throw new UserNotFound();
            });

            await expect(userController.delete(user.id)).rejects.toThrow(
                UserNotFound,
            );
        });
    });
});
