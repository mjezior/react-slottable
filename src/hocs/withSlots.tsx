import { ComponentType, JSX, ReactNode } from 'react';

import SlotProvider from '../providers/SlotProvider';
import Slot from '../components/Slot';
import pascalCase, { PascalCase } from '../utils/pascalCase';

type SlotRenderProps<T> = Omit<T, 'children'>;

export type StandardSlotsProps<
  Slot extends string,
  AdditionalProps extends Partial<Record<Slot, unknown>> = object
> = Record<Slot, { children?: ReactNode }> & AdditionalProps;

export type Slottable<
  Slots extends readonly string[],
  SlotsProps extends Partial<StandardSlotsProps<Slots[number]>> = StandardSlotsProps<Slots[number]>,
  ComponentProps extends object = object
> = ComponentType<ComponentProps> & {
  /**
   * Component attatched to your component after wrapping it with `withSlots`. Lets you to distribute different content in place of related slot outlet.
   * @param {string} name slot outlet name to which you want to put content of `children` prop
   * @param {ReactNode} children content that slot outlet's default content will be replaced to
   */
  Slot: <SlotName extends Slots[number]>(props: {
    name: SlotName;
    children: ReactNode | ((props: SlotRenderProps<SlotsProps[SlotName]>) => ReactNode);
  }) => JSX.Element | null;
} & {
  [SlotName in keyof SlotsProps & string as PascalCase<SlotName>]: (props: {
    children: ReactNode | ((props: SlotRenderProps<SlotsProps[SlotName]>) => ReactNode);
  }) => JSX.Element;
};

/**
 * Higher-order component that lets you to turn your component into slottable one,
 * by attaching to it special components that will inject their children into related slot outlets.
 * @param {ComponentType} Component - component that you want to enrich
 * @param {readonly string[]} slotNames - slot names that you want to use
 * @example
 * import { withSlots, useSlots, SlotsProps as StandardSlotsProps } from 'react-slottable';
 *
 * type Slots = ['header', 'content', 'footer'];
 * const slots: Slots = ['header', 'content', 'footer'];
 *
 * type SlotProps = StandardSlotsProps<Slots, {
 *   header: { test1: string; test2: boolean };
 *   content: { text: string };
 *   footer: { test3: number };
 * }>;
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
const withSlots = <
  Slot extends string,
  SlotsProps extends Partial<StandardSlotsProps<Slot>> = StandardSlotsProps<Slot>,
  ComponentProps extends object = object
>(
  Component: ComponentType<ComponentProps>,
  slotNames: readonly Slot[]
): Slottable<readonly Slot[], SlotsProps, ComponentProps> => {
  const EnchancedComponent = ((props: ComponentProps) => (
    <SlotProvider>
      <Component {...props} />
    </SlotProvider>
  )) as Slottable<readonly Slot[], SlotsProps, ComponentProps>;

  Object.assign(EnchancedComponent, { Slot });

  slotNames.forEach((slotName) => {
    const pascalCaseName = pascalCase(slotName);
    Object.assign(EnchancedComponent, {
      [pascalCaseName]: ({ children }: { children: ReactNode }) => <Slot name={slotName}>{children}</Slot>,
    });
  });

  return EnchancedComponent;
};

export default withSlots;
