export abstract class AuthenticationRepository {
    abstract login(email: string, password: string): Promise<void>;
}
