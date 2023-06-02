import { Section } from '@domain/entities/place/section/section';
import { Prisma, Section as PrismaSection } from '@prisma/client';

export class SectionMapper {
    static toPersistence(section: Section): Prisma.SectionUncheckedCreateInput {
        return {
            id: section.id,
            name: section.name,
            categoryId: section.categoryId,
            menuId: section.menuId,
            isActive: section.isActive,
            createdAt: section.createdAt,
            updatedAt: section.updatedAt,
        };
    }

    static toDomain(section: PrismaSection): Section {
        return new Section(
            {
                name: section.name,
                categoryId: section.categoryId,
                menuId: section.menuId,
                isActive: section.isActive,
                createdAt: section.createdAt,
                updatedAt: section.updatedAt,
            },
            section.id,
        );
    }
}
