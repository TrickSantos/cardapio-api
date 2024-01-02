import { UserRepository } from '@domain/repositories/user.repository';
import { Hashing } from '@helpers/hashing';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
    #hash: Hashing;

    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {
        this.#hash = new Hashing();
    }

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isValid = await this.#hash.compare(password, user.password);

        if (!isValid) throw new UnauthorizedException();

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
