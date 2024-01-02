export abstract class Authentication {
    abstract login(email: string, password: string): Promise<void>;
}
