import { createContext, JSX, useRef, useState } from 'react';

import { ContextValues, Props } from './SlotProvider.types';

const SlotContext = createContext<ContextValues>({
  slots: {},
  hasSlot: () => false,
  registerSlot: () => {},
  getSlot: () => <></>,
});

const SlotProvider = ({ children }: Props): JSX.Element => {
  const [, setTimestamp] = useState<number>(0);
  const slots = useRef<ContextValues['slots']>({});

  const hasSlot: ContextValues['hasSlot'] = (name) => name in slots;

  const registerSlot: ContextValues['registerSlot'] = (name, content) => {
    slots.current = { ...slots.current, [name]: content } as ContextValues['slots'];
    setTimestamp(new Date().getTime());
  };

  const getSlot: ContextValues['getSlot'] = (name) => slots.current[name];

  return (
    <SlotContext.Provider value={{ slots: slots.current, hasSlot, registerSlot, getSlot }}>
      {children}
    </SlotContext.Provider>
  );
};

export default SlotProvider;
export { SlotContext };
