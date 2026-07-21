import { Types } from "mongoose";

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type Serializable<T> = T extends Primitive
    ? T
    : T extends Date
      ? Date
      : T extends Types.ObjectId
        ? string
        : T extends Array<infer U>
          ? Serializable<U>[]
          : T extends object
            ? {
                  [K in keyof T]: Serializable<T[K]>;
              }
            : T;

function serialize(value: unknown): unknown {
    if (value === null || value === undefined) {
        return value;
    }

    if (value instanceof Types.ObjectId) {
        return value.toString();
    }

    if (value instanceof Date) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(serialize);
    }

    if (typeof value === "object") {
        const result: Record<string, unknown> = {};

        for (const [key, val] of Object.entries(value)) {
            result[key] = serialize(val);
        }

        return result;
    }

    return value;
}

export function serializeDocument<T>(document: T): Serializable<T> {
    return serialize(document) as Serializable<T>;
}

export function serializeDocuments<T>(documents: T[]): Serializable<T>[] {
    return documents.map((document) => serializeDocument(document));
}
