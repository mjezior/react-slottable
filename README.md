# react-slottable

Utilities for creating slottable [React](https://reactjs.org/) components in Vue style.

## Motivation

This package was created to resolve limitations of `children` prop.

In Vue, you can pass multiple `<template>` tags as component's children. Let's say, we have `FancyLayout` component that renders header, content and footer. Example usage would look like this:
```tsx
<FancyLayout>
  <template #header>header</template>
  <template #content>content</template>
  <template #footer>footer</template>
</FancyLayout>
```

In React, you are only allowed to pass one `children` prop (either explicitly or by nesting it in structure). This packages lets you to use `<FancyLayout>` this way:
```tsx
<FancyLayout>
  <FancyLayout.Header>header</FancyLayout.Header>
  <FancyLayout.Content>content</FancyLayout.Content>
  <FancyLayout.Footer>footer</FancyLayout.Footer>
</FancyLayout>
```

## Usage

In order to use slots feature in component, first you have to wrap it with `withSlots` HoC, passing also an array of slot names you want to use.

Then, you'll be able to use `useSlots` hook inside your component, to retrieve slot outlet components.

**Important note:** Remember to place `children` prop somewhere in your component, otherwise slots will not work!

```tsx
import { withSlots, useSlots } from 'react-slottable';

const slots = ['header', 'content', 'footer'];

const FancyLayout = withSlots(({ children }) => {
  const { Header, Content, Footer } = useSlots(slots);

  return (
    <>
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
      {children} {/* <-- It's important to put children prop somewhere */}
    </>
  );
}, slots);
```

After wrapping your component with `withSlots`, it will be enriched with `<Slot>` sub-component, which can be accessed in JSX as following:

```tsx
<FancyLayout>
  <FancyLayout.Slot name="header">header</FancyLayout.Slot>
</FancyLayout>
```

`<Slot>` component can receive only `name` and `children` props, both are required.

For your convenience, `withSlots` dynamically generates additional sub-components with capitalized names, basing on passed slot names. Those components are just syntactic sugar on `<Slot>` (with pre-filled `name` prop), so these two syntaxes are equal:

```tsx
<FancyLayout.Slot name="header">header</FancyLayout.Slot>
...
<FancyLayout.Header>header</FancyLayout.Header>
```

If you would like to set default content for slot, simply pass it as children to slot outlet component received from `useSlots` hook:
```tsx
import { withSlots, useSlots } from 'react-slottable';

const slots = ['header', 'content', 'footer'];

const FancyLayout = withSlots(({ children }) => {
  const { Header, Content, Footer } = useSlots(slots);

  return (
    <>
      <div>
        <Header />
        <Content>
          loading
        </Content>
        <Footer />
      </div>
      {children} {/* <-- It's important to put children prop somewhere */}
    </>
  );
}, slots);
```

You can also pass some additional props to slot outlet component from inside of your component, and then receive them, passing function as children of appropriate sub-component attached by `withSlots`:
```tsx
import { withSlots, useSlots } from 'react-slottable';

const slots = ['header', 'content', 'footer'];

const FancyLayout = withSlots(({ children }) => {
  const { Header, Content, Footer } = useSlots(slots);

  return (
    <>
      <div>
        <Header />
        <Content data={...} isLoading={...} />
        <Footer />
      </div>
      {children} {/* <-- It's important to put children prop somewhere */}
    </>
  );
}, slots);

...

<FancyLayout>
  <FancyLayout.Content>
    {({ isLoading, data }) => (!isLoading ? data.length : 'loading')}
  </FancyLayout.Content>
</FancyLayout>
```

### Typescript

This package fully supports types, so you can enjoy editor hints and type checking by using it.

**Important note:** to make it work as desired, when defining array of slot names, you **have to** define it as tuple.

You can do it either typing variable using tuple, or by using `as const`:
```tsx
type Slots = ['title', 'content', 'actions'];
const slots: Slots = ['title', 'content', 'actions'];

or

const slots = ['title', 'content', 'actions'] as const;
```
