import { ReactNode } from 'react';
export declare type ContextValues<T extends Record<string, unknown> = Record<string, unknown>> = {
    slots: Record<string, ReactNode | ((props: T) => ReactNode)>;
    hasSlot: (name: string) => boolean;
    registerSlot: <R extends T>(name: string, content: ReactNode | ((props: R) => ReactNode)) => void;
    getSlot: (name: string) => ReactNode | ((props: T) => ReactNode);
};
export declare type Props = {
    children: ReactNode;
};
