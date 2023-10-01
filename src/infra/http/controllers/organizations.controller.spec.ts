import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { Test } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { makeOrganization } from '@test/factories/organization.factory';
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
import { InMemoryOrganizationRepository } from '@infra/database/inMemory/organization.repository';
import { InMemoryPermissionRepository } from '@infra/database/inMemory/permission.repository';
import { makePlace } from '@test/factories/place.factory';
import { makeOrganizationRole } from '@test/factories/organizationRole.factory';
import { makePermission } from '@test/factories/permission.factory';

describe('Organization Controller', () => {
    const orgRepository = new InMemoryOrganizationRepository();
    const permissionRepository = new InMemoryPermissionRepository();
    let organizationController: OrganizationsController;
    const createOrganization: CreateOrganizationUseCase =
        new CreateOrganizationUseCase(orgRepository);
    const createOrganizationRole: CreateOrganizationRoleUseCase =
        new CreateOrganizationRoleUseCase(orgRepository, permissionRepository);
    const listAllOrganizations: ListAllOrganizationsUseCase =
        new ListAllOrganizationsUseCase(orgRepository);
    const listAllPermissions: ListAllOrganizationPermissionsUseCase =
        new ListAllOrganizationPermissionsUseCase(orgRepository);
    const findByIdOrganization: FindOrganizationByIdUseCase =
        new FindOrganizationByIdUseCase(orgRepository);
    const findAllPlaces: FindAllPlacesUseCase = new FindAllPlacesUseCase(
        orgRepository,
    );
    const findAllRoles: FindAllOrganizationRolesUseCase =
        new FindAllOrganizationRolesUseCase(orgRepository);
    const updateOrganization: UpdateOrganizationUseCase =
        new UpdateOrganizationUseCase(orgRepository);
    const deleteOrganization: DeleteOrganizationUseCase =
        new DeleteOrganizationUseCase(orgRepository);

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [OrganizationsController],
            providers: [
                {
                    provide: CreateOrganizationUseCase,
                    useValue: createOrganization,
                },
                {
                    provide: CreateOrganizationRoleUseCase,
                    useValue: createOrganizationRole,
                },
                {
                    provide: ListAllOrganizationsUseCase,
                    useValue: listAllOrganizations,
                },
                {
                    provide: ListAllOrganizationPermissionsUseCase,
                    useValue: listAllPermissions,
                },
                {
                    provide: FindOrganizationByIdUseCase,
                    useValue: findByIdOrganization,
                },
                {
                    provide: FindAllPlacesUseCase,
                    useValue: findAllPlaces,
                },
                {
                    provide: FindAllOrganizationRolesUseCase,
                    useValue: findAllRoles,
                },
                {
                    provide: UpdateOrganizationUseCase,
                    useValue: updateOrganization,
                },
                {
                    provide: DeleteOrganizationUseCase,
                    useValue: deleteOrganization,
                },
            ],
        }).compile();

        organizationController = moduleRef.get<OrganizationsController>(
            OrganizationsController,
        );
    });

    afterEach(async () => {
        orgRepository.reset();
    });

    describe('defined', () => {
        it('should be defined', () => {
            expect(organizationController).toBeDefined();
        });
    });

    describe('listAll', () => {
        it('should return an array of organizations', async () => {
            orgRepository.organizations = Array.from({ length: 10 }).map(() =>
                makeOrganization(),
            );
            const organizations = await organizationController.listAll();

            expect(organizations).toHaveLength(10);
        });
    });

    describe('create', () => {
        afterEach(async () => {
            orgRepository.reset();
        });

        it('should create a organization', async () => {
            const data = makeOrganization();

            await organizationController.create({
                name: data.name,
                logo: data.logo,
            });

            expect(orgRepository.organizations).toHaveLength(1);
        });
    });

    describe('findById', () => {
        let organization: any;

        beforeEach(async () => {
            organization = makeOrganization();

            orgRepository.organizations = [organization];
        });

        afterEach(async () => {
            orgRepository.reset();
        });

        it('should return a organization', async () => {
            const find = await organizationController.findById(organization.id);

            expect(find.name).toEqual(organization.name);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                organizationController.findById('123'),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('update', () => {
        let organization: any;

        beforeEach(async () => {
            organization = makeOrganization();

            orgRepository.organizations = [organization];
        });

        afterEach(async () => {
            orgRepository.reset();
        });

        it('should update a organization', async () => {
            await organizationController.update(organization.id, {
                name: 'new name',
            });

            expect(orgRepository.organizations[0].name).toEqual('new name');
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                organizationController.update('123', {
                    name: 'new name',
                }),
            ).rejects.toThrow('Organization not found');
        });
    });

    describe('delete', () => {
        let organization: any;

        beforeEach(async () => {
            organization = makeOrganization();

            orgRepository.organizations = [organization];
        });

        afterEach(async () => {
            orgRepository.reset();
        });

        it('should delete a organization', async () => {
            await organizationController.delete(organization.id);

            expect(orgRepository.organizations).toHaveLength(0);
        });

        it('should throw a NotFoundException', async () => {
            await expect(organizationController.delete('123')).rejects.toThrow(
                OrganizationNotFound,
            );
        });
    });

    describe('findPlaces', () => {
        let organization: any;

        beforeEach(async () => {
            organization = makeOrganization();
            const places = Array.from({ length: 10 }).map(() =>
                makePlace({ organizationId: organization.id }),
            );

            orgRepository.organizations = [organization];
            orgRepository.places = {
                organizationId: organization.id,
                places,
            };
        });

        afterEach(async () => {
            orgRepository.reset();
        });

        it('should return an array of places', async () => {
            const places = await organizationController.findPlaces(
                organization.id,
            );

            expect(places).toHaveLength(10);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                organizationController.findPlaces('123'),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('findRoles', () => {
        let organization: any;

        beforeEach(async () => {
            organization = makeOrganization();
            const roles = Array.from({ length: 10 }).map(() =>
                makeOrganizationRole({ organizationId: organization.id }),
            );

            orgRepository.organizations = [organization];
            orgRepository.roles = {
                organizationId: organization.id,
                roles,
            };
        });

        afterEach(async () => {
            orgRepository.reset();
        });

        it('should return an array of roles', async () => {
            const roles = await organizationController.findRoles(
                organization.id,
            );

            expect(roles).toHaveLength(10);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                organizationController.findRoles('123'),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('findPermissions', () => {
        let organization: any;

        beforeEach(async () => {
            organization = makeOrganization();
            const permissions = Array.from({ length: 10 }).map(() =>
                makePermission(),
            );

            orgRepository.organizations = [organization];
            orgRepository.permissions = {
                organizationId: organization.id,
                permissions,
            };
        });

        afterEach(async () => {
            orgRepository.reset();
        });

        it('should return an array of permissions', async () => {
            const permissions = await organizationController.findPermissions(
                organization.id,
            );

            expect(permissions).toHaveLength(10);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                organizationController.findPermissions('123'),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });

    describe('createRole', () => {
        let organization: any;

        beforeEach(async () => {
            organization = makeOrganization();

            orgRepository.organizations = [organization];
        });

        afterEach(async () => {
            orgRepository.reset();
            permissionRepository.reset();
        });

        it('should create a role', async () => {
            const data = makeOrganizationRole();
            const permissions = Array.from({ length: 10 }).map(() =>
                makePermission(),
            );
            permissionRepository.permissions = permissions;

            await organizationController.createRole(organization.id, {
                name: data.name,
                description: data.description,
                permissions: permissions.map((permission) => permission.id),
            });

            const roles = await orgRepository.findRoles(organization.id);
            expect(roles).toHaveLength(1);
        });

        it('should throw a NotFoundException', async () => {
            await expect(
                organizationController.createRole('123', {
                    name: 'new name',
                    description: 'new description',
                    permissions: [],
                }),
            ).rejects.toThrow(OrganizationNotFound);
        });
    });
});
