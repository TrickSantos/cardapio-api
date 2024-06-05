import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ValidateUseCase } from '../validate';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly validate: ValidateUseCase) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers['authorization'];
            const token = authHeader.split(' ')[1];
            const user = await this.validate.execute(token);

            if (!user) {
                return false;
            }

            req.user = user;
            return true;
        } catch (e) {
            return false;
        }
    }
}
