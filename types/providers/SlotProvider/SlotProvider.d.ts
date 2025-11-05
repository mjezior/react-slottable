import { JSX } from 'react';
import { ContextValues, Props } from './SlotProvider.types';
declare const SlotContext: import("react").Context<ContextValues<Record<string, unknown>>>;
declare const SlotProvider: ({ children }: Props) => JSX.Element;
export default SlotProvider;
export { SlotContext };
