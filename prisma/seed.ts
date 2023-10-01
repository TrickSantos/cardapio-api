import { PrismaClient } from '@prisma/client';
import permissions from './seeds/permissions';
import roles from './seeds/roles';
import defaultOrganizationRoles from '@helpers/constants/default/organization/roles';

const prisma = new PrismaClient();

async function main() {
    await prisma.role.createMany({
        data: roles,
        skipDuplicates: true,
    });

    await prisma.permission.createMany({
        data: permissions,
        skipDuplicates: true,
    });

    const permissionsIds = await prisma.permission.findMany({
        where: {
            name: {
                in: permissions.map((permission) => permission.name),
            },
        },
        select: {
            id: true,
        },
    });

    const foundRoles = await prisma.role.findMany({
        where: {
            name: {
                in: roles.map((role) => role.name),
            },
        },
        select: {
            id: true,
        },
    });

    await Promise.all(
        foundRoles.map((role) => {
            return prisma.role.update({
                where: {
                    id: role.id,
                },
                data: {
                    permissions: {
                        connect: permissionsIds,
                    },
                },
            });
        }),
    );

    await prisma.organization.create({
        data: {
            name: 'SySirius',
            logo: 'https://picsum.photos/600',
            users: {
                create: {
                    email: 'patrick.tafa@gmail.com',
                    username: 'tricksantos',
                    password: 'password',
                },
            },
            Place: {
                create: {
                    name: 'SySirius',
                    address: 'SySirius',
                    city: 'SySirius',
                    phone: 'SySirius',
                    state: 'MT',
                    website: 'SySirius',
                    zip: '78053650',
                    categories: {
                        createMany: {
                            data: [
                                {
                                    name: 'Pizza',
                                },
                                {
                                    name: 'Burgers',
                                },
                                {
                                    name: 'Bebidas',
                                },
                                {
                                    name: 'Sobremesas',
                                },
                            ],
                            skipDuplicates: true,
                        },
                    },
                    products: {
                        createMany: {
                            data: [
                                {
                                    name: 'Pizza de Calabresa',
                                    description: 'Pizza de Calabresa',
                                },
                                {
                                    name: 'Pizza de Frango',
                                    description: 'Pizza de Frango',
                                },
                                {
                                    name: 'Pizza de Strogonoff de Carne',
                                    description: 'Pizza de Strogonoff de Carne',
                                },
                            ],
                            skipDuplicates: true,
                        },
                    },
                    Menu: {
                        create: {
                            name: 'Menu',
                            description: 'Menu',
                        },
                    },
                },
            },
            roles: {
                createMany: {
                    data: defaultOrganizationRoles,
                    skipDuplicates: true,
                },
            },
            permissions: {
                connect: permissionsIds,
            },
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
