import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

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

const container = document.querySelector('#app');

if (container) {
  const root = createRoot(container);
  
  root.render(<App />);
}
