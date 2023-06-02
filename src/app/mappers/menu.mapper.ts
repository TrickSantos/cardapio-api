import { Menu } from '@domain/entities/place/menu/menu';
import { Section, Menu as PrismaMenu, Prisma } from '@prisma/client';
import { SectionMapper } from './section.mapper';

type MenuPersistence = PrismaMenu & {
    sections?: Section[];
};

export class MenuMapper {
    static toPersistence(menu: Menu): Prisma.MenuUncheckedCreateInput {
        return {
            id: menu.id,
            name: menu.name,
            description: menu.description,
            placeId: menu.placeId,
            isActive: menu.isActive,
            createdAt: menu.createdAt,
            updatedAt: menu.updatedAt,
        };
    }

    static toDomain(menu: MenuPersistence): Menu {
        const sections = menu.sections?.map(SectionMapper.toDomain);

        return new Menu(
            {
                name: menu.name,
                description: menu.description,
                placeId: menu.placeId,
                sections,
                isActive: menu.isActive,
                createdAt: menu.createdAt,
                updatedAt: menu.updatedAt,
            },
            menu.id,
        );
    }
}
