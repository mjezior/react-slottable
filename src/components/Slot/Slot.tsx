import { JSX, memo, ReactNode, useContext, useEffect } from 'react';

import { SlotContext } from '../../providers/SlotProvider';

/**
 * Component attatched to your component after wrapping it with `withSlots`. Lets you to distribute different content in place of related slot outlet.
 * @param {string} name slot outlet name to which you want to put content of `children` prop
 * @param {ReactNode} children content that slot outlet's default content will be replaced to
 */
const Slot = memo(
  <S extends string, T extends Record<string, unknown> = Record<string, unknown>>({
    name,
    children,
  }: {
    name: S;
    children: ReactNode | ((props: T) => ReactNode);
  }): JSX.Element => {
    const { registerSlot } = useContext(SlotContext);

    useEffect(() => registerSlot(name, children), [children]); // eslint-disable-line react-hooks/exhaustive-deps

    return <></>;
  }
);

export default Slot;
