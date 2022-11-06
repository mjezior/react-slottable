/// <reference types="react" />
import { StandardSlotsProps } from 'hocs/withSlots';
/**
 * Hook that returns pascal-cased slot outlet components, basing on passed slot names array.
 * @param {readonly string[]} names array of slot names that you want to use within your main component
 * @returns {Record<Slot, ComponentType<SlotsProps[Slot]>>} object of components with dynamically generated pascal-cased names that are slot outlets to use in main component
 */
declare const useSlots: <Slot extends string, SlotsProps extends Partial<StandardSlotsProps<Slot>> = StandardSlotsProps<Slot>>(names: readonly Slot[]) => { [SlotName in Slot as Capitalize<SlotName>]: (props: Exclude<SlotsProps[SlotName], undefined>) => JSX.Element | null; };
export default useSlots;
