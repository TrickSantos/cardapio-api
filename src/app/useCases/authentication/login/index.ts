import { JwtPayload } from '@domain/entities/authentication/JwtPayload';
import { Hashing } from '@helpers/hashing';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserByEmailUseCase } from '@useCases/user/findByEmail';

@Injectable()
export class LoginUseCase {
    #hashing: Hashing;
    constructor(
        private jwtService: JwtService,
        private findUserByEmailUseCase: FindUserByEmailUseCase,
    ) {
        this.#hashing = new Hashing();
    }

    async execute(email: string, password: string) {
        const user = await this.findUserByEmailUseCase.execute(email);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const passwordMatch = await this.#hashing.compare(
            password,
            user.password,
        );

        if (!passwordMatch) {
            throw new UnauthorizedException('email or password incorrect');
        }

        const payload = new JwtPayload({
            sub: user.id,
            username: user.username,
            email: user.email,
            organizationId: user.organizationId,
        });

        return {
            token: await this.jwtService.signAsync(payload.toJSON()),
        };
    }
}
