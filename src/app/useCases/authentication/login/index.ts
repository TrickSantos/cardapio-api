import { JwtPayload } from '@domain/entities/authentication/JwtPayload';
import { UserRepository } from '@domain/repositories/user.repository';
import { Hashing } from '@helpers/hashing';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
    #hashing: Hashing;
    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository,
    ) {
        this.#hashing = new Hashing();
    }

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

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
