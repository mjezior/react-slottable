import { ComponentType, ReactNode } from 'react';
import { PascalCase } from 'utils/pascalCase';
declare type SlotRenderProps<T> = Omit<T, 'children'>;
export declare type StandardSlotsProps<S extends string> = Record<S, {
    children?: ReactNode;
}>;
export declare type Slottable<Slots extends readonly string[], SlotsProps extends Partial<StandardSlotsProps<Slots[number]>> = StandardSlotsProps<Slots[number]>, ComponentProps extends object = object> = ComponentType<ComponentProps> & {
    /**
     * Component attatched to your component after wrapping it with `withSlots`. Lets you to inject different content in place of related slot outlet.
     * @param {string} name slot outlet name to which you want to put content of `children` prop
     * @param {ReactNode} children content that slot outlet's default content will be replaced to
     */
    Slot: <SlotName extends Slots[number]>(props: {
        name: SlotName;
        children: ReactNode | ((props: SlotRenderProps<SlotsProps[SlotName]>) => ReactNode);
    }) => JSX.Element | null;
} & {
    [SlotName in Slots[number] as PascalCase<SlotName>]: (props: {
        children: ReactNode | ((props: SlotRenderProps<SlotsProps[SlotName]>) => ReactNode);
    }) => JSX.Element | null;
};
/**
 * Higher-order component that lets you to turn your component into slottable one,
 * by attaching to it special components that will inject their children into related slot outlets.
 * @param {ComponentType} Component - component that you want to enrich
 * @param {readonly string[]} slotNames - slot names that you want to use
 * @example
 * type Slots = ['header', 'content', 'footer'];
 * const slots: Slots = ['header', 'content', 'footer'];
 *
 * type SlotProps = {
 *   header: { test1: string; test2: boolean };
 *   content: { text: string };
 *   footer: { test3: number };
 * };
 *
 * type Props = { loading: boolean; children: ReactNode };
 *
 * const Test = ({ loading, children }: Props) => {
 *   const { Header, Content, Footer } = useSlots<Slots, SlotProps>(slots);
 *
 *   return !loading ? (
 *     <div>
 *       <Header>default header</Header>
 *       {children}
 *       <div>
 *         <Content text="dynamic text">default text</Content>
 *       </div>
 *       <Footer>default footer</Footer>
 *     </div>
 *   ) : (
 *    <div>loading</div>
 *   );
 * };
 *
 * export const SlottableTest = withSlots<Slots, SlotProps, Props>(Test, slots);
 *
 * <SlotsTest loading>
 *   <SlotsTest.Slot name="header">header override</SlotsTest.Slot>
 *   <SlotsTest.Content>{({ text }) => <div>{text}</div>}</SlotsTest.Content>
 *   <SlotsTest.Footer>footer override</SlotsTest.Footer>
 * </SlotsTest>
 */
declare const withSlots: <Slot extends string, SlotsProps extends Partial<StandardSlotsProps<Slot>> = StandardSlotsProps<Slot[number]>, ComponentProps extends object = object>(Component: ComponentType<ComponentProps>, slotNames: readonly Slot[]) => Slottable<readonly Slot[], SlotsProps, ComponentProps>;
export default withSlots;
