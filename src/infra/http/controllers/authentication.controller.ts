import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '@useCases/authentication/login';
import { LoginDTO } from '../dtos/authentication/login.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(private loginUseCase: LoginUseCase) {}

    @Post('login')
    async login(@Body() body: LoginDTO) {
        return await this.loginUseCase.execute(body.email, body.password);
    }
}
