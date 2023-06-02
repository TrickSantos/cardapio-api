import { Menu } from '@domain/entities/place/menu/menu';
import { MenuRepository } from '@domain/repositories/menu.repository';
import { MenuMapper } from '@mappers/menu.mapper';
import { PrismaService } from './prisma.service';

export class PrismaMenuRepository implements MenuRepository {
    constructor(private prisma: PrismaService) {}

    async create(menu: Menu): Promise<void> {
        const data = MenuMapper.toPersistence(menu);
        await this.prisma.menu.create({
            data,
        });
    }

    async update(menu: Menu): Promise<void> {
        await this.prisma.menu.update({
            where: { id: menu.id },
            data: {
                name: menu.name,
                description: menu.description,
                isActive: menu.isActive,
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
        });
        if (menu) {
            return MenuMapper.toDomain(menu);
        }
        return null;
    }

    async findAll(): Promise<Menu[]> {
        const menus = await this.prisma.menu.findMany();
        return menus.map(MenuMapper.toDomain);
    }
}
