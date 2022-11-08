import { ReactNode, useContext, useEffect, useMemo } from 'react';

import { StandardSlotsProps } from 'hocs/withSlots';
import { SlotContext } from 'providers/SlotProvider';
import upperFirst from 'utils/upperFirst';
import useBoolean from 'hooks/useBoolean';

/**
 * Hook that returns slot outlet components, basing on passed slot names array.
 * @param {readonly string[]} names array of slot names that you want to use within your main component
 * @returns {Record<Slot, ComponentType<SlotsProps[Slot]>>} object of components with dynamically generated names that are slot outlets to use in main component
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
        const capitalizedName = upperFirst(name);
        const Component = ({ children, ...restProps }: { children?: ReactNode }) => {
          const slot = getSlot(name);
          const slotContent = typeof slot === 'function' ? slot(restProps) : slot;
          return isLoaded ? <>{slotContent || children}</> : <></>;
        };
        Component.displayName = capitalizedName;
        return {
          ...acc,
          [capitalizedName]: Component,
        };
      }, {} as { [SlotName in Slot as Capitalize<SlotName>]: (props: Exclude<SlotsProps[SlotName], undefined>) => JSX.Element | null }),
    [slots, isLoaded] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return components;
};

export default useSlots;
