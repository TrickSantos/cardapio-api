import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreatePlaceUseCase } from '@useCases/place/create';
import { DeletePlaceUseCase } from '@useCases/place/delete';
import { FindPlaceByIdUseCase } from '@useCases/place/findById';
import { ListAllPlacesUseCase } from '@useCases/place/listAll';
import { UpdatePlaceUseCase } from '@useCases/place/update';
import { CreatePlaceDTO } from '../dtos/place/create.dto';
import { UpdatePlaceDTO } from '../dtos/place/update.dto';
import { ListAllProductsUseCase } from '@useCases/product/listAll';
import { ListAllCategoriesUseCase } from '@useCases/category/listAll';
import { ListAllCategoriesDTO } from '../dtos/place/listAllCategories';

@Controller('places')
export class PlacesController {
    constructor(
        private createPlace: CreatePlaceUseCase,
        private listAllPlaces: ListAllPlacesUseCase,
        private findPlaceById: FindPlaceByIdUseCase,
        private updatePlace: UpdatePlaceUseCase,
        private deletePlace: DeletePlaceUseCase,
        private listProducts: ListAllProductsUseCase,
        private listCategories: ListAllCategoriesUseCase,
    ) {}

    @Get()
    async listAll() {
        const places = await this.listAllPlaces.execute();
        return places.map((place) => place.toJSON());
    }

    @Get(':id/products')
    async listAllProducts(@Param('id') id: string) {
        const place = await this.findPlaceById.execute(id);
        const products = await this.listProducts.execute({
            placeId: place.id,
            photos: true,
        });
        return products.map((product) => product.toJSON());
    }

    @Get(':id/categories')
    async listAllCategories(
        @Param('id') id: string,
        @Query() query: ListAllCategoriesDTO,
    ) {
        const place = await this.findPlaceById.execute(id);
        const categories = await this.listCategories.execute({
            placeId: place.id,
            ...(query.isActive && { isActive: query.isActive }),
        });
        return categories.map((product) => product.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const place = await this.findPlaceById.execute(id);
        return place.toJSON();
    }

    @Post()
    async create(@Body() body: CreatePlaceDTO) {
        await this.createPlace.execute({
            organizationId: body.organizationId,
            name: body.name,
            address: body.address,
            city: body.city,
            state: body.state,
            zip: body.zip,
            phone: body.phone,
            website: body.website,
        });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdatePlaceDTO) {
        await this.updatePlace.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deletePlace.execute(id);
    }
}
