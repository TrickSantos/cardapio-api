import { describe, it, expect, beforeAll, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationNotFound } from '@useCases/errors/OrganizationNotFound';
import { CreateOrganizationUseCase } from '@useCases/organization/create';
import { CreateOrganizationRoleUseCase } from '@useCases/organization/createRole';
import { DeleteOrganizationUseCase } from '@useCases/organization/delete';
import { FindAllPlacesUseCase } from '@useCases/organization/findAllPlaces';
import { FindAllOrganizationRolesUseCase } from '@useCases/organization/findAllRoles';
import { FindOrganizationByIdUseCase } from '@useCases/organization/findById';
import { ListAllOrganizationsUseCase } from '@useCases/organization/listAll';
import { ListAllOrganizationPermissionsUseCase } from '@useCases/organization/listAllPermissions';
import { UpdateOrganizationUseCase } from '@useCases/organization/update';
import { makePlace } from '@test/factories/place.factory';
import { makePermission } from '@test/factories/permission.factory';
import { OrganizationUseCaseModule } from '@useCases/organization/organization.module';
import { PlaceUseCaseModule } from '@useCases/place/place.module';
import { Organization } from '@domain/entities/organization/organization';
import { makeRole } from '@test/factories/role.factory';
import { makeOrganization } from '@test/factories/organization.factory';

describe('Organization Controller', () => {
    let organization: Organization;
    let organizationController: OrganizationsController;
    let createOrganization: CreateOrganizationUseCase,
        createOrganizationRole: CreateOrganizationRoleUseCase,
        listAllOrganizations: ListAllOrganizationsUseCase,
        listAllPermissions: ListAllOrganizationPermissionsUseCase,
        findByIdOrganization: FindOrganizationByIdUseCase,
        findAllPlaces: FindAllPlacesUseCase,
        findAllRoles: FindAllOrganizationRolesUseCase,
        updateOrganization: UpdateOrganizationUseCase,
        deleteOrganization: DeleteOrganizationUseCase;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [OrganizationsController],
            imports: [OrganizationUseCaseModule, PlaceUseCaseModule],
        }).compile();

        organization = makeOrganization();

        organizationController = moduleRef.get<OrganizationsController>(
            OrganizationsController,
        );
        createOrganization = moduleRef.get<CreateOrganizationUseCase>(
            CreateOrganizationUseCase,
        );
        createOrganizationRole = moduleRef.get<CreateOrganizationRoleUseCase>(
            CreateOrganizationRoleUseCase,
        );
        listAllOrganizations = moduleRef.get<ListAllOrganizationsUseCase>(
            ListAllOrganizationsUseCase,
        );
        listAllPermissions =
            moduleRef.get<ListAllOrganizationPermissionsUseCase>(
                ListAllOrganizationPermissionsUseCase,
            );
        findByIdOrganization = moduleRef.get<FindOrganizationByIdUseCase>(
            FindOrganizationByIdUseCase,
        );
        findAllPlaces =
            moduleRef.get<FindAllPlacesUseCase>(FindAllPlacesUseCase);
        findAllRoles = moduleRef.get<FindAllOrganizationRolesUseCase>(
            FindAllOrganizationRolesUseCase,
        );
        updateOrganization = moduleRef.get<UpdateOrganizationUseCase>(
            UpdateOrganizationUseCase,
        );
        deleteOrganization = moduleRef.get<DeleteOrganizationUseCase>(
            DeleteOrganizationUseCase,
        );
    });

    describe('defined', () => {
        it('should be defined', () => {
            expect(organizationController).toBeDefined();
        });
    });

    it('should return an array of organizations', async () => {
        const data = [makeOrganization()];
        const spy = vi.spyOn(listAllOrganizations, 'execute');
        spy.mockImplementation(() => Promise.resolve(data));

        const organizations = await organizationController.listAll();

        expect(organizations).toEqual(data.map((org) => org.toJSON()));
    });

    it('should create a organization', async () => {
        const spy = vi.spyOn(createOrganization, 'execute');
        spy.mockImplementation(() => Promise.resolve());

        await organizationController.create({
            name: 'any_name',
            logo: 'any_logo',
        });

        expect(spy).toHaveBeenCalledWith({
            name: 'any_name',
            logo: 'any_logo',
        });
    });

    describe('findById', () => {
        it('should return a organization', async () => {
            const spy = vi.spyOn(findByIdOrganization, 'execute');
            spy.mockImplementation(async () => Promise.resolve(organization));

            const data = await organizationController.findById(organization.id);

            expect(spy).toHaveBeenCalledWith(organization.id);

            expect(data).toEqual(organization.toJSON());
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(findByIdOrganization, 'execute');
            spy.mockImplementation(async () => {
                throw new OrganizationNotFound();
            });

            await expect(
                organizationController.findById(organization.id),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('update', () => {
        it('should update a organization', async () => {
            const spy = vi.spyOn(updateOrganization, 'execute');
            spy.mockImplementation(async () => Promise.resolve());

            await organizationController.update(organization.id, {
                name: 'new name',
            });

            expect(spy).toHaveBeenCalledWith({
                id: organization.id,
                name: 'new name',
            });
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(updateOrganization, 'execute');

            spy.mockImplementation(async () => {
                throw new OrganizationNotFound();
            });

            await expect(
                organizationController.update(organization.id, {
                    name: 'new name',
                }),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('delete', () => {
        it('delete should be called with a id', async () => {
            const spy = vi.spyOn(deleteOrganization, 'execute');
            spy.mockImplementation(async () => Promise.resolve());

            await organizationController.delete(organization.id);

            expect(spy).toHaveBeenCalledWith(organization.id);
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(deleteOrganization, 'execute');
            spy.mockImplementation(async () => {
                throw new OrganizationNotFound();
            });

            await expect(
                organizationController.delete(organization.id),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('findPlaces', () => {
        it('should return an array of places', async () => {
            const spy = vi.spyOn(findAllPlaces, 'execute');
            spy.mockImplementation(async () => Promise.resolve([makePlace()]));

            const places = await organizationController.findPlaces(
                organization.id,
            );

            expect(places).toHaveLength(1);
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(findAllPlaces, 'execute');
            spy.mockImplementation(async () => {
                throw new OrganizationNotFound();
            });

            await expect(
                organizationController.findPlaces('123'),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('findRoles', () => {
        it('should return an array of roles', async () => {
            const spy = vi.spyOn(findAllRoles, 'execute');
            spy.mockImplementation(async () => Promise.resolve([makeRole()]));

            const roles = await organizationController.findRoles(
                organization.id,
            );

            expect(roles).toHaveLength(1);
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(findAllRoles, 'execute');
            spy.mockImplementation(async () => {
                throw new OrganizationNotFound();
            });

            await expect(
                organizationController.findRoles('123'),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('findPermissions', () => {
        it('should return an array of permissions', async () => {
            const spy = vi.spyOn(listAllPermissions, 'execute');
            spy.mockImplementation(async () =>
                Promise.resolve([makePermission()]),
            );

            const permissions = await organizationController.findPermissions(
                organization.id,
            );

            expect(permissions).toHaveLength(1);
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(listAllPermissions, 'execute');
            spy.mockImplementation(async () => {
                throw new OrganizationNotFound();
            });

            await expect(
                organizationController.findPermissions('123'),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('createRole', () => {
        it('should call createRole', async () => {
            const spy = vi.spyOn(createOrganizationRole, 'execute');
            spy.mockImplementation(async () => Promise.resolve());

            await organizationController.createRole(organization.id, {
                name: 'new name',
                description: 'new description',
                permissions: [],
            });

            expect(spy).toHaveBeenCalledWith({
                organizationId: organization.id,
                name: 'new name',
                description: 'new description',
                permissions: [],
            });
        });

        it('should throw a NotFoundException', async () => {
            const spy = vi.spyOn(createOrganizationRole, 'execute');
            spy.mockImplementation(async () => {
                throw new OrganizationNotFound();
            });

            await expect(
                organizationController.createRole(organization.id, {
                    name: 'new name',
                    description: 'new description',
                    permissions: [],
                }),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });
});
