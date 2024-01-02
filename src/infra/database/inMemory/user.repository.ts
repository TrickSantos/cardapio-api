import { User } from '@domain/entities/user/user';
import {
    FindAllQuery,
    UserRepository,
} from '@domain/repositories/user.repository';
import { limitOffset } from '@helpers/functions/limitOffset';

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async create(user: User): Promise<void> {
        this.users.push(user);
    }

    async update(user: User): Promise<void> {
        const current = this.users.find((u) => u.id === user.id);
        if (current) {
            current.update(user);
        }
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find((user) => user.id === id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find((user) => user.email === email) || null;
    }

    async findAll(query?: FindAllQuery): Promise<User[]> {
        if (query?.organizationId) {
            return this.users.filter(
                (user) => user.organizationId === query.organizationId,
            );
        }

        if (query?.limit && query?.offset) {
            return limitOffset(this.users, query.limit, query.offset);
        }

        return this.users.filter((user) => user.isActive);
    }

    async delete(id: string): Promise<void> {
        const current = this.users.find((user) => user.id === id);
        if (current) {
            current.update({ isActive: false });
        }
    }

    reset() {
        this.users = [];
    }
}
