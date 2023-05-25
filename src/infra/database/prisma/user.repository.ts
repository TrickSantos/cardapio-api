import { User } from '@domain/entities/user/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class InMemoryUserRepository extends UserRepository {
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

    async findAll(): Promise<User[]> {
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
