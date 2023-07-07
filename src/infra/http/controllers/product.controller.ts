import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { CreateProductUseCase } from '@useCases/product/create';
import { DeleteProductUseCase } from '@useCases/product/delete';
import { FindProductByIdUseCase } from '@useCases/product/findById';
import { ListAllProductsUseCase } from '@useCases/product/listAll';
import { UpdateProductUseCase } from '@useCases/product/update';
import { CreateProductDTO } from '../dtos/product/create.dto';
import { UpdateProductDTO } from '../dtos/product/update.dto';
import { SupabaseService } from '@infra/uploads/supabase/supabase.service';

@Controller('products')
export class ProductsController {
    constructor(
        private createProduct: CreateProductUseCase,
        private listAllProducts: ListAllProductsUseCase,
        private findProductById: FindProductByIdUseCase,
        private updateProduct: UpdateProductUseCase,
        private deleteProduct: DeleteProductUseCase,
        private supabase: SupabaseService,
    ) {}

    @Post('upload')
    async upload(@Req() req: any) {
        const { body } = req;
        const file = body.image;

        return await this.supabase.uploadFile(file);
    }

    @Get()
    async listAll() {
        const products = await this.listAllProducts.execute();
        return products.map((product) => product.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const product = await this.findProductById.execute(id);
        return product.toJSON();
    }

    @Post()
    async create(@Body() body: CreateProductDTO) {
        await this.createProduct.execute(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateProductDTO) {
        await this.updateProduct.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteProduct.execute(id);
    }
}
