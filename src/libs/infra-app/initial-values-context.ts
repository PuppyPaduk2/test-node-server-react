import { createContext } from "react";

export enum TypeValue {
  MAP = "map",
  SET = "set",
  ARRAY = "array",
  OBJECT = "object",
  NUMBER = "number",
  STRING = "string",
  NULL = "null",
  UNDEFINED = "undefined",
};

const incorrectTypeValue = "Incorrect type of value";

const getTypeValue = (value: any): TypeValue => {
  if (value instanceof Map) return TypeValue.MAP;
  if (value instanceof Set) return TypeValue.SET;
  if (Array.isArray(value)) return TypeValue.ARRAY;
  if (typeof value === "object") return TypeValue.OBJECT;
  if (typeof value === "number") return TypeValue.NUMBER;
  if (typeof value === "string") return TypeValue.STRING;
  if (value === null) return TypeValue.NULL;
  if (value === undefined) return TypeValue.UNDEFINED;
  throw incorrectTypeValue;
};

type SerializeTypeMappers = {
  [TypeValue.MAP]: <Key, Value>(value: Map<Key, Value>) => [Key, Value][],
  [TypeValue.SET]: <Value>(value: Set<Value>) => Value[];
  [TypeValue.ARRAY]: <Value>(value: Value[]) => Value[];
  [TypeValue.OBJECT]: <Value extends object>(value: Value) => Value;
  [TypeValue.NUMBER]: (value: number) => number;
  [TypeValue.STRING]: <Value extends string>(value: Value) => Value;
  [TypeValue.NULL]: (value: null) => null;
  [TypeValue.UNDEFINED]: (value: undefined) => undefined;
};

const serializeTypeMappers: SerializeTypeMappers = {
  "map": (value) => Array.from(value),
  "set": (value) => Array.from(value),
  "array": (value) => value,
  "object": (value) => value,
  "number": (value) => value,
  "string": (value) => value,
  "null": (value) => value,
  "undefined": (value) => value,
};

type SerializeValue = {
  <Key, Value>(type: TypeValue, value: Map<Key, Value>): [Key, Value][];
  <Value>(type: TypeValue, value: Set<Value>): Value[];
  <Value>(type: TypeValue, value: Value[]): Value[];
  <Value extends object>(type: TypeValue, value: Value): Value;
  (type: TypeValue, value: number): number;
  <Value extends string>(type: TypeValue, value: Value): Value;
  (type: TypeValue, value: null): null;
  (type: TypeValue, value: undefined): undefined;
};

const serializeValue: SerializeValue = (type: TypeValue, value: any): any => {
  if (type === TypeValue.MAP) return serializeTypeMappers[type](value);
  if (type === TypeValue.SET) return serializeTypeMappers[type](value);
  if (type === TypeValue.ARRAY) return serializeTypeMappers[type](value);
  if (type === TypeValue.OBJECT) return serializeTypeMappers[type](value);
  if (type === TypeValue.NUMBER) return serializeTypeMappers[type](value);
  if (type === TypeValue.STRING) return serializeTypeMappers[type](value);
  if (type === TypeValue.NULL) return serializeTypeMappers[type](value);
  if (type === TypeValue.UNDEFINED) return serializeTypeMappers[type](value);
};

type DeserializeTypeMappers = {
  [TypeValue.MAP]: <Key, Value>(value:[Key, Value][]) => Map<Key, Value>,
  [TypeValue.SET]: <Value>(value: Value[]) => Set<Value>;
  [TypeValue.ARRAY]: <Value>(value: Value[]) => Value[];
  [TypeValue.OBJECT]: <Value extends object>(value: Value) => Value;
  [TypeValue.NUMBER]: (value: number) => number;
  [TypeValue.STRING]: <Value extends string>(value: Value) => Value;
  [TypeValue.NULL]: (value: null) => null;
  [TypeValue.UNDEFINED]: (value: undefined) => undefined;
};

const deserializeTypeMappers: DeserializeTypeMappers = {
  "map": (value) => new Map(value),
  "set": (value) => new Set(value),
  "array": (value) => value,
  "object": (value) => value,
  "number": (value) => value,
  "string": (value) => value,
  "null": (value) => value,
  "undefined": (value) => value,
};

type DeserializeValue = {
  <Key, Value>(type: TypeValue, value: [Key, Value][]):  Map<Key, Value>;
  <Value>(type: TypeValue, value: Value[]): Set<Value>;
  <Value>(type: TypeValue, value: Value[]): Value[];
  <Value extends object>(type: TypeValue, value: Value): Value;
  (type: TypeValue, value: number): number;
  <Value extends string>(type: TypeValue, value: Value): Value;
  (type: TypeValue, value: null): null;
  (type: TypeValue, value: undefined): undefined;
};

const deserializeValue: DeserializeValue = (type: TypeValue, value: any): any => {
  if (type === TypeValue.MAP) return deserializeTypeMappers[type](value);
  if (type === TypeValue.SET) return deserializeTypeMappers[type](value);
  if (type === TypeValue.ARRAY) return deserializeTypeMappers[type](value);
  if (type === TypeValue.OBJECT) return deserializeTypeMappers[type](value);
  if (type === TypeValue.NUMBER) return deserializeTypeMappers[type](value);
  if (type === TypeValue.STRING) return deserializeTypeMappers[type](value);
  if (type === TypeValue.NULL) return deserializeTypeMappers[type](value);
  if (type === TypeValue.UNDEFINED) return deserializeTypeMappers[type](value);
};

export class InitialValues extends Map<string, any> {
  serialize(): object {
    const cacheEntries = Array.from(this);
    const result = {};

    for (let index = 0; index < cacheEntries.length; index += 1) {
      const [key, value] = cacheEntries[index];
      const type = getTypeValue(value);

      result[key] = { type, value: serializeValue(type, value) };
    }

    return result;
  }
  deserialize(data: object): void {
    const keys = Object.getOwnPropertyNames(data);

    for (let index = 0; index < keys.length; index += 1) {
      const propName = keys[index];
      const dataItem = data[propName];

      if (typeof dataItem === "object" && "type" in dataItem) {
        const { type, value } = data[propName];

        this.set(propName, deserializeValue(type, value));
      }
    }
  }
}

// export type InitialValues<Key, Value> = {
//   clear(): void;
//   delete(key: Key): boolean;
//   get(key: string): Key | undefined;
//   has(key: string): boolean;
//   set(key: string, value: Value): InitialValues<Key, Value>;
//   readonly size: number;
// };

export function createInitialValuesContextValue(values: object = {}): InitialValues {
  return new InitialValues(Object.entries(values));
}

export const initialValuesContext = createContext<InitialValues>(createInitialValuesContextValue());

export const InitialValuesProvider = initialValuesContext.Provider;
