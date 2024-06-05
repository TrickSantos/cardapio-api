import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '@useCases/user/create';
import { DeleteUserUseCase } from '@useCases/user/delete';
import { FindUserByIdUseCase } from '@useCases/user/findById';
import { ListAllUsersUseCase } from '@useCases/user/listAll';
import { UpdateUserUseCase } from '@useCases/user/update';
import { CreateUserDTO } from '../dtos/user/create.dto';
import { UpdateUserDto } from '../dtos/user/update.dto';
import { listAllUsersDTO } from '../dtos/user/listAll.dto';
import { JwtAuthGuard } from '@useCases/authentication/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private createUser: CreateUserUseCase,
        private listAllUsers: ListAllUsersUseCase,
        private findUserById: FindUserByIdUseCase,
        private updateUser: UpdateUserUseCase,
        private deleteUser: DeleteUserUseCase,
    ) {}

    @Get()
    async listAll(@Query() query?: listAllUsersDTO) {
        const users = await this.listAllUsers.execute(query);

        return users.map((user) => {
            return {
                ...user.toJSON(),
                contact: user.contact?.toJSON(),
            };
        });
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const user = await this.findUserById.execute(id);
        return user.toJSON();
    }

    @Post()
    async create(@Body() body: CreateUserDTO) {
        await this.createUser.execute({
            username: body.username,
            email: body.email,
            password: body.password,
            contact: {
                email: body.contact.email,
                phone: body.contact.phone,
                firstName: body.contact.firstName,
                lastName: body.contact.lastName,
            },
            organizationId: body.organizationId,
            isActive: body.isActive,
            permissions: body.permissions,
            roles: body.roles,
        });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
        await this.updateUser.execute({
            id,
            ...body,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteUser.execute(id);
    }
}
