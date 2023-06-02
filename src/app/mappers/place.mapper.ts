import { Place } from '@domain/entities/place/place';
import { Prisma, Place as PlacePrisma } from '@prisma/client';

export class PlaceMapper {
    public static toPersistence(
        place: Place,
    ): Prisma.PlaceUncheckedCreateInput {
        return {
            id: place.id,
            organizationId: place.organizationId,
            name: place.name,
            address: place.address,
            city: place.city,
            state: place.state,
            zip: place.zip,
            phone: place.phone,
            website: place.website,
            isActive: place.isActive,
            createdAt: place.createdAt,
            updatedAt: place.updatedAt,
        };
    }

    public static toDomain(data: PlacePrisma): Place {
        return new Place(
            {
                organizationId: data.organizationId,
                name: data.name,
                address: data.address,
                city: data.city,
                state: data.state,
                zip: data.zip,
                phone: data.phone,
                website: data.website,
                isActive: data.isActive,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
            data.id,
        );
    }
}
