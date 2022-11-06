declare const upperFirst: <T extends string>([firstChar, ...restChars]: T) => Capitalize<T>;
export default upperFirst;
