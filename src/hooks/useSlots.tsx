import { ReactNode, useContext, useEffect, useMemo } from 'react';

import { SlotContext } from '../providers/SlotProvider';
import pascalCase, { PascalCase } from '../utils/pascalCase';
import useBoolean from './useBoolean';

/**
 * Hook that returns slot outlet components, basing on passed slot names array.
 * @param {readonly string[]} names array of slot names that you want to use within your main component
 * @returns {Record<Slot, ComponentType<SlotsProps[Slot]>>} object of components with dynamically generated names that are slot outlets to use in main component
 */
const useSlots = <
  Slot extends string,
  SlotsProps extends Record<Slot, { children?: ReactNode }> = Record<Slot, { children?: ReactNode }>
>(
  names: readonly Slot[]
) => {
  const { slots, getSlot } = useContext(SlotContext);
  const [isLoaded, { on }] = useBoolean(false);

  useEffect(on, []); // eslint-disable-line react-hooks/exhaustive-deps

  const components = useMemo(
    () =>
      names.reduce((acc, name) => {
        const pascalCaseName = pascalCase(name);
        const Component = ({ children, ...restProps }: { children?: ReactNode }) => {
          const slot = getSlot(name);
          const slotContent = typeof slot === 'function' ? slot(restProps) : slot;
          return isLoaded ? <>{slotContent || children}</> : <></>;
        };
        Component.displayName = pascalCaseName;
        return {
          ...acc,
          [pascalCaseName]: Component,
        };
      }, {}) as {
        [SlotName in keyof SlotsProps & string as PascalCase<SlotName>]: (props: SlotsProps[SlotName]) => JSX.Element;
      },
    [slots, isLoaded] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return components;
};

export default useSlots;
