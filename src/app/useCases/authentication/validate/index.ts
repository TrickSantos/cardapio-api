import { JwtPayloadProps } from '@domain/entities/authentication/JwtPayload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidateUseCase {
    constructor(private jwtService: JwtService) {}

    async execute(payload: string): Promise<JwtPayloadProps> {
        return this.jwtService.verify(payload);
    }
}
