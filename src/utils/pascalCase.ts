type KebabToSnakeCase<S extends string> = S extends `${infer T}-${infer U}` ? `${T}_${KebabToSnakeCase<U>}` : S;

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

export type PascalCase<T extends string> = Capitalize<SnakeToCamelCase<KebabToSnakeCase<T>>>;

const pascalCase = <T extends string>(value: T): PascalCase<T> => {
  const [firstChar, ...restChars] = value.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  return `${firstChar.toUpperCase()}${restChars.join('')}` as PascalCase<T>;
};

export default pascalCase;
