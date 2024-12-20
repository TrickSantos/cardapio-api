import { Place } from '@domain/entities/place/place';
import { PlaceRepository } from '@domain/repositories/place.repository';
import { PlaceMapper } from '@mappers/place.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaPlaceRepository implements PlaceRepository {
    constructor(private prisma: PrismaService) {}

    async create(place: Place): Promise<void> {
        const data = PlaceMapper.toPersistence(place);
        await this.prisma.place.create({
            data,
        });
    }

    async update(place: Place): Promise<void> {
        await this.prisma.place.update({
            where: { id: place.id },
            data: {
                name: place.name,
                address: place.address,
                city: place.city,
                state: place.state,
                phone: place.phone,
                website: place.website,
                zip: place.zip,
                isActive: place.isActive,
                organizationId: place.organizationId,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.place.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    async findById(id: string): Promise<Place | null> {
        const place = await this.prisma.place.findUnique({
            where: { id },
        });

        if (place) {
            return PlaceMapper.toDomain(place);
        }
        return null;
    }

    async findAll(): Promise<Place[]> {
        const places = await this.prisma.place.findMany();
        return places.map(PlaceMapper.toDomain);
    }
}
