declare type KebabToSnakeCase<S extends string> = S extends `${infer T}-${infer U}` ? `${T}_${KebabToSnakeCase<U>}` : S;
declare type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}` : S;
export declare type PascalCase<T extends string> = Capitalize<SnakeToCamelCase<KebabToSnakeCase<T>>>;
declare const pascalCase: <T extends string>(value: T) => Capitalize<SnakeToCamelCase<KebabToSnakeCase<T>>>;
export default pascalCase;
