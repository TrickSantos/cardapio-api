import { User } from '@domain/entities/user/user';

export type FindAllQuery = {
    organizationId?: string;
    limit?: number;
    offset?: number;
};
export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract update(user: User): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findById(id: string): Promise<User | null>;
    abstract findAll(query?: FindAllQuery): Promise<User[]>;
}
