export declare type UpperFirst<T extends string> = T extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : never;
declare const upperFirst: <T extends string>(value: T) => UpperFirst<T>;
export default upperFirst;
