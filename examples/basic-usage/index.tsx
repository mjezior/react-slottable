import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { withSlots, useSlots } from '../../src';

const slots = ['header', 'content', 'footer'] as const;

type Props = {
  children: ReactNode;
};

const FancyLayout = withSlots(({ children }: Props) => {
  const { Header, Content, Footer } = useSlots(slots);

  return (
    <>
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
      {children}
    </>
  );
}, slots);

const App = (): JSX.Element => (
  <FancyLayout>
    <FancyLayout.Slot name="header">header</FancyLayout.Slot>
    <FancyLayout.Content>content</FancyLayout.Content>
    <FancyLayout.Footer>footer</FancyLayout.Footer>
  </FancyLayout>
);

ReactDOM.render(<App />, document.querySelector('#app'));
