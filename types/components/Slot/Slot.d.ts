import { JSX, ReactNode } from 'react';
/**
 * Component attatched to your component after wrapping it with `withSlots`. Lets you to distribute different content in place of related slot outlet.
 * @param {string} name slot outlet name to which you want to put content of `children` prop
 * @param {ReactNode} children content that slot outlet's default content will be replaced to
 */
declare const Slot: import("react").MemoExoticComponent<(<S extends string, T extends Record<string, unknown> = Record<string, unknown>>({ name, children, }: {
    name: S;
    children: ReactNode | ((props: T) => ReactNode);
}) => JSX.Element)>;
export default Slot;
