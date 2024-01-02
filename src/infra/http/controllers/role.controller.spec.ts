import { describe, it, expect, beforeAll, vi } from 'vitest';
import { RoleController } from './role.controller';
import { Test } from '@nestjs/testing';
import { RoleUseCaseModule } from '@useCases/role/role.module';
import { makeRole } from '@test/factories/role.factory';
import { AddUsersToRoleUseCase } from '@useCases/role/addUsers';
import { CreateRoleUseCase } from '@useCases/role/create';
import { DeleteRoleUseCase } from '@useCases/role/delete';
import { FindRoleByIdUseCase } from '@useCases/role/findById';
import { ListAllRolesUseCase } from '@useCases/role/listAll';
import { UpdateRoleUseCase } from '@useCases/role/update';
import { Role } from '@domain/entities/user/role/role';
import { makeUser } from '@test/factories/user.factory';
import { RoleNotFound } from '@useCases/errors/RoleNotFound';
import { UserNotFound } from '@useCases/errors/UserNotFound';

describe('RoleController', () => {
    let role: Role;
    let roleController: RoleController;
    let createRole: CreateRoleUseCase,
        listAllRoles: ListAllRolesUseCase,
        findByIdRole: FindRoleByIdUseCase,
        updateRole: UpdateRoleUseCase,
        deleteRole: DeleteRoleUseCase,
        addUsersToRole: AddUsersToRoleUseCase;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RoleController],
            imports: [RoleUseCaseModule],
        }).compile();

        role = makeRole();
        roleController = moduleRef.get<RoleController>(RoleController);
        createRole = moduleRef.get<CreateRoleUseCase>(CreateRoleUseCase);
        listAllRoles = moduleRef.get<ListAllRolesUseCase>(ListAllRolesUseCase);
        findByIdRole = moduleRef.get<FindRoleByIdUseCase>(FindRoleByIdUseCase);
        updateRole = moduleRef.get<UpdateRoleUseCase>(UpdateRoleUseCase);
        deleteRole = moduleRef.get<DeleteRoleUseCase>(DeleteRoleUseCase);
        addUsersToRole = moduleRef.get<AddUsersToRoleUseCase>(
            AddUsersToRoleUseCase,
        );
    });

    it('should be defined', () => {
        expect(roleController).toBeDefined();
    });

    it('listAllRoles should return an array of roles', async () => {
        const data = [makeRole()];

        const spy = vi.spyOn(listAllRoles, 'execute');
        spy.mockImplementation(() => Promise.resolve(data));

        const roles = await roleController.listAll();

        expect(roles).toEqual(data.map((role) => role.toJSON()));
    });

    it('should create a role', async () => {
        const spy = vi.spyOn(createRole, 'execute');
        spy.mockImplementation(() => Promise.resolve());

        await roleController.create({
            name: 'any_name',
            description: 'any_description',
            permissions: [],
            isActive: true,
        });

        expect(spy).toHaveBeenCalledWith({
            name: 'any_name',
            description: 'any_description',
            permissions: [],
            isActive: true,
        });
    });

    it('should add users to a role', async () => {
        const user = await makeUser();
        const spy = vi.spyOn(addUsersToRole, 'execute');
        spy.mockImplementation(() => Promise.resolve());

        await roleController.addUsers(role.id, {
            users: [user.id],
        });

        expect(spy).toHaveBeenCalledWith({
            roleId: role.id,
            users: [user.id],
        });
    });

    it('should throw a RoleNotFound when a not valid roleId is called', async () => {
        const spy = vi.spyOn(addUsersToRole, 'execute');
        spy.mockImplementation(() => {
            throw new RoleNotFound();
        });

        await expect(
            roleController.addUsers('123', {
                users: ['123'],
            }),
        ).rejects.toThrow(RoleNotFound);
    });

    it('should throw a UserNotFound when a not valid userId is called', async () => {
        const spy = vi.spyOn(addUsersToRole, 'execute');
        spy.mockImplementation(() => {
            throw new UserNotFound();
        });

        await expect(
            roleController.addUsers(role.id, {
                users: ['123'],
            }),
        ).rejects.toThrow(UserNotFound);
    });

    it('findByIdRole should be called with a valid id', async () => {
        const spy = vi.spyOn(findByIdRole, 'execute');
        spy.mockImplementation(async () => Promise.resolve(role));

        await roleController.findById(role.id);

        expect(spy).toHaveBeenCalledWith(role.id);
    });

    it('findByIdRole should return a role', async () => {
        const spy = vi.spyOn(findByIdRole, 'execute');
        spy.mockImplementation(async () => Promise.resolve(role));
        const find = await roleController.findById(role.id);

        expect(find).toEqual(role.toJSON());
    });

    it('should throw a RoleNotFound when findByIdRole is called with a invalid roleId', async () => {
        const spy = vi.spyOn(findByIdRole, 'execute');
        spy.mockImplementation(async () => {
            throw new RoleNotFound();
        });

        await expect(roleController.findById('123')).rejects.toThrow(
            RoleNotFound,
        );
    });

    it('updateRole should be called with a body', async () => {
        const spy = vi.spyOn(updateRole, 'execute');
        spy.mockImplementation(async () => Promise.resolve());

        await roleController.update(role.id, {
            name: 'new name',
            isActive: false,
        });

        expect(spy).toHaveBeenCalledWith({
            id: role.id,
            name: 'new name',
            isActive: false,
        });
    });

    it('should throw a RoleNotFound when updateRole is called with a invalid roleId', async () => {
        const spy = vi.spyOn(updateRole, 'execute');
        spy.mockImplementation(async () => {
            throw new RoleNotFound();
        });

        await expect(
            roleController.update(role.id, {
                name: 'new name',
                isActive: false,
            }),
        ).rejects.toThrow(RoleNotFound);
    });

    it('deleteRole should be called with a id', async () => {
        const spy = vi.spyOn(deleteRole, 'execute');
        spy.mockImplementation(async () => Promise.resolve());

        await roleController.delete(role.id);

        expect(spy).toHaveBeenCalledWith(role.id);
    });

    it('should throw a RoleNotFound when deleteRole is called with a invalid roleId', async () => {
        const spy = vi.spyOn(deleteRole, 'execute');
        spy.mockImplementation(async () => {
            throw new RoleNotFound();
        });

        await expect(roleController.delete('123')).rejects.toThrow(
            RoleNotFound,
        );
    });
});
