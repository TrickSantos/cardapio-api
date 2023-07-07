import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
