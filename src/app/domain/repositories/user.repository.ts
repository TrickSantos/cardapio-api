import { User } from '@domain/entities/user/user';

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract update(user: User): Promise<void>;
    abstract delete(user: User): Promise<void>;
    abstract findById(id: string): Promise<User>;
    abstract findAll(): Promise<User[]>;
}
