import { Section } from '@domain/entities/place/section/section';
import { SectionRepository } from '@domain/repositories/section.repository';

export class InMemorySectionRepository implements SectionRepository {
    private sections: Section[] = [];

    async create(section: Section): Promise<void> {
        this.sections.push(section);
    }

    async update(section: Section): Promise<void> {
        const current = this.sections.find((u) => u.id === section.id);
        if (current) {
            current.update(section);
        }
    }

    async findById(id: string): Promise<Section | null> {
        const section = this.sections.find((Section) => Section.id === id);
        if (section) {
            return section;
        }
        return null;
    }

    async findAll(): Promise<Section[]> {
        return this.sections.filter((Section) => Section.isActive);
    }

    async delete(id: string): Promise<void> {
        const current = this.sections.find((Section) => Section.id === id);
        if (current) {
            current.update({ isActive: false });
        }
    }

    reset() {
        this.sections = [];
    }
}
