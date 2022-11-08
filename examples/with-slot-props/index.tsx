import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { withSlots, useSlots, SlotsProps as StandardSlotsProps } from '../../src';

const slots = ['header', 'content', 'footer'] as const;

type Slots = typeof slots[number];

type SlotsProps = StandardSlotsProps<Slots, {
  header: {
    test1: string;
  };
  content: {
    test2: boolean;
  };
  footer: {
    test3: number;
  };
}>;

type Props = {
  children: ReactNode;
};

const FancyLayout = withSlots<Slots, SlotsProps, Props>(({ children }: Props) => {
  const { Header, Content, Footer } = useSlots<Slots, SlotsProps>(slots);

  return (
    <>
      <div>
        <Header test1="test1" />
        <Content test2 />
        <Footer test3={3} />
      </div>
      {children}
    </>
  );
}, slots);

const App = (): JSX.Element => (
  <FancyLayout>
    <FancyLayout.Header>{({ test1 }) => <div>{test1}</div>}</FancyLayout.Header>
    <FancyLayout.Content>{({ test2 }) => (test2 ? 'loaded' : 'loading')}</FancyLayout.Content>
    <FancyLayout.Footer>{({ test3 }) => Math.random() * test3}</FancyLayout.Footer>
  </FancyLayout>
);

ReactDOM.render(<App />, document.querySelector('#app'));
