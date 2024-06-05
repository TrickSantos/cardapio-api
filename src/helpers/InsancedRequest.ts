import { User } from '@domain/entities/user/user';
import { FastifyRequest } from 'fastify/types/request';

export type InstancedRequest = FastifyRequest & {
    user: User;
};
