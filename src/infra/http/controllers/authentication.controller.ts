import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '@useCases/authentication/login';
import { LocalAuthGuard } from '@useCases/authentication/guards/local.guard';
import { InstancedRequest } from '@helpers/InsancedRequest';

@Controller('auth')
export class AuthenticationController {
    constructor(private loginUseCase: LoginUseCase) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: InstancedRequest) {
        return await this.loginUseCase.execute(req.user);
    }
}
