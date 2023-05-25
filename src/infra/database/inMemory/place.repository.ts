import { Place } from '@domain/entities/place/place';
import { PlaceRepository } from '@domain/repositories/place.repository';

export class InMemoryPlaceRepository implements PlaceRepository {
    private places: Place[] = [];

    async create(Place: Place): Promise<void> {
        this.places.push(Place);
    }

    async update(Place: Place): Promise<void> {
        const current = this.places.find((u) => u.id === Place.id);
        if (current) {
            current.update(Place);
        }
    }

    async findById(id: string): Promise<Place | null> {
        const place = this.places.find((Place) => Place.id === id);
        if (place) {
            return place;
        }
        return null;
    }

    async findAll(): Promise<Place[]> {
        return this.places.filter((Place) => Place.isActive);
    }

    async delete(id: string): Promise<void> {
        const current = this.places.find((Place) => Place.id === id);
        if (current) {
            current.update({ isActive: false });
        }
    }

    reset() {
        this.places = [];
    }
}
