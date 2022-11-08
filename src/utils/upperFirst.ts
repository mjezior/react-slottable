export type UpperFirst<T extends string> = T extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : never;

const upperFirst = <T extends string>(value: T): UpperFirst<T> => {
  const [firstChar, ...restChars] = value;
  return `${firstChar.toUpperCase()}${restChars.join('')}` as UpperFirst<T>;
};

export default upperFirst;
