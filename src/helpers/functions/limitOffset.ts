export function limitOffset<T>(array: T[], limit: number, offset: number): T[] {
    return array.slice(offset, offset + limit);
}
