import { ReactNode, useContext, useEffect, useMemo } from 'react';

import { StandardSlotsProps } from 'hocs/withSlots';
import { SlotContext } from 'providers/SlotProvider';
import pascalCase from 'utils/pascalCase';
import useBoolean from 'hooks/useBoolean';

/**
 * Hook that returns pascal-cased slot outlet components, basing on passed slot names array.
 * @param {readonly string[]} names array of slot names that you want to use within your main component
 * @returns {Record<Slot, ComponentType<SlotsProps[Slot]>>} object of components with dynamically generated pascal-cased names that are slot outlets to use in main component
 */
const useSlots = <Slot extends string, SlotsProps extends Partial<StandardSlotsProps<Slot>> = StandardSlotsProps<Slot>>(
  names: readonly Slot[]
) => {
  const { slots, getSlot } = useContext(SlotContext);
  const [isLoaded, { on }] = useBoolean(false);

  useEffect(on, []); // eslint-disable-line react-hooks/exhaustive-deps

  const components = useMemo(
    () =>
      names.reduce((acc, name) => {
        const pascalName = pascalCase(name);
        const Component = ({ children, ...restProps }: { children?: ReactNode }) => {
          const slot = getSlot(name);
          const slotContent = typeof slot === 'function' ? slot(restProps) : slot;
          return isLoaded ? <>{slotContent || children}</> : <></>;
        };
        Component.displayName = pascalName;
        return {
          ...acc,
          [pascalName]: Component,
        };
      }, {} as { [SlotName in Slot as Capitalize<SlotName>]: (props: Exclude<SlotsProps[SlotName], undefined>) => JSX.Element | null }),
    [slots, isLoaded] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return components;
};

export default useSlots;
