import { User } from '@domain/entities/user/user';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
    constructor(private jwtService: JwtService) {}

    async execute(user: User) {
        const payload = {
            sub: user.id,
            username: user.username,
            organizationId: user.organizationId,
        };

        return {
            token: await this.jwtService.signAsync(payload),
        };
    }
}
