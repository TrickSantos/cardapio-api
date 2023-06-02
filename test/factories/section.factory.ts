import { Section, SectionProps } from '@domain/entities/place/section/section';
import { faker } from '@faker-js/faker/locale/pt_BR';

type Override = Partial<SectionProps>;

export function makeSection(props: Override = {}): Section {
    return new Section({
        menuId: faker.datatype.uuid(),
        categoryId: faker.datatype.uuid(),
        name: faker.commerce.department(),
        isActive: true,
        ...props,
    });
}
