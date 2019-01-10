import { plainToClass } from 'class-transformer';

export function serializeIdToObject<T>(object: T) {
    return function (value: number) {
        return plainToClass(object as any, { id: value });
    };
}
export function serializeObjectToId<T>(object: T) {
    return function (value: T) {
        return value ? (value as any).id : undefined;
    };
}
