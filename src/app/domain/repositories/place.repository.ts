import { Place } from '@domain/entities/place/place';

export abstract class PlaceRepository {
    abstract create(place: Place): Promise<void>;
    abstract update(place: Place): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<Place>;
    abstract findAll(): Promise<Place[]>;
}
