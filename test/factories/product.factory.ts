import { Product, ProductProps } from '@domain/entities/place/product/product';
import { faker } from '@faker-js/faker';

type Override = Partial<ProductProps>;

export function makeProduct(props: Override = {}): Product {
    return new Product({
        placeId: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        isActive: true,
        price: null,
        ...props,
    });
}
