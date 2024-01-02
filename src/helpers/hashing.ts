import * as bcrypt from 'bcrypt';

export class Hashing {
    #saltRounds: number;

    constructor(saltRounds = 10) {
        this.#saltRounds = saltRounds;
    }

    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.#saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
