import { Section } from '@domain/entities/place/section/section';
import { SectionRepository } from '@domain/repositories/section.repository';
import { SectionMapper } from '@mappers/section.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaSectionRepository implements SectionRepository {
    constructor(private prisma: PrismaService) {}

    async create(section: Section): Promise<void> {
        const data = SectionMapper.toPersistence(section);
        await this.prisma.section.create({
            data,
        });
    }

    async update(section: Section): Promise<void> {
        await this.prisma.section.update({
            where: { id: section.id },
            data: {
                name: section.name,
                isActive: section.isActive,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.section.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Section | null> {
        const section = await this.prisma.section.findUnique({
            where: { id },
        });
        if (section) {
            return SectionMapper.toDomain(section);
        }
        return null;
    }

    async findAll(): Promise<Section[]> {
        const sections = await this.prisma.section.findMany();
        return sections.map(SectionMapper.toDomain);
    }
}
