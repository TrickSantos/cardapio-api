import { Menu } from '@domain/entities/place/menu/menu';
import {
    FindAllPayload,
    MenuRepository,
} from '@domain/repositories/menu.repository';
import { MenuMapper } from '@mappers/menu.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaMenuRepository implements MenuRepository {
    constructor(private prisma: PrismaService) {}

    async create(menu: Menu): Promise<void> {
        const { sections, ...data } = MenuMapper.toPersistence(menu);
        await this.prisma.menu.create({
            data: {
                ...data,
                sections: {
                    createMany: {
                        skipDuplicates: true,
                        data: sections.map((section) => ({
                            name: section.name,
                            categoryId: section.categoryId,
                            id: section.id,
                        })),
                    },
                },
            },
        });
    }

    async update(menu: Menu): Promise<void> {
        const { sections, ...data } = MenuMapper.toPersistence(menu);
        await this.prisma.menu.update({
            where: { id: menu.id },
            data: {
                ...data,
                sections: {
                    deleteMany: {},
                    createMany: {
                        data: sections.map((section) => ({
                            name: section.name,
                            categoryId: section.categoryId,
                            id: section.id,
                        })),
                        skipDuplicates: true,
                    },
                },
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.menu.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Menu | null> {
        const menu = await this.prisma.menu.findUnique({
            where: { id },
            include: {
                sections: true,
            },
        });
        if (menu) {
            return MenuMapper.toDomain(menu);
        }
        return null;
    }

    async findAll(props: FindAllPayload): Promise<Menu[]> {
        const { placeId, isActive } = props || {};

        const menus = await this.prisma.menu.findMany({
            where: {
                ...(isActive && { isActive }),
                ...(placeId && { placeId }),
            },
            include: {
                sections: true,
            },
        });
        return menus.map(MenuMapper.toDomain);
    }
}
