import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreatePriceUseCase } from '@useCases/price/create';
import { DeletePriceUseCase } from '@useCases/price/delete';
import { FindPriceByIdUseCase } from '@useCases/price/findById';
import { ListAllPricesUseCase } from '@useCases/price/listAll';
import { UpdatePriceUseCase } from '@useCases/price/update';
import { CreatePriceDTO } from '../dtos/price/create.dto';
import { UpdatePriceDTO } from '../dtos/price/update.dto';

@Controller('prices')
export class PriceController {
    constructor(
        private createPrice: CreatePriceUseCase,
        private listAllPrices: ListAllPricesUseCase,
        private findByIdPrice: FindPriceByIdUseCase,
        private updatePrice: UpdatePriceUseCase,
        private deletePrice: DeletePriceUseCase,
    ) {}

    @Get()
    async listAll() {
        const prices = await this.listAllPrices.execute();
        return prices.map((organization) => organization.toJSON());
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const price = await this.findByIdPrice.execute(id);
        return price.toJSON();
    }

    @Post()
    async create(@Body() body: CreatePriceDTO) {
        await this.createPrice.execute(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdatePriceDTO) {
        await this.updatePrice.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deletePrice.execute(id);
    }
}
