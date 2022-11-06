import { useState, useCallback, Dispatch, SetStateAction } from 'react';

type UseBooleanReturnType = [
  boolean,
  {
    setValue: Dispatch<SetStateAction<boolean>>;
    toggle: () => void;
    on: () => void;
    off: () => void;
  }
];

const useBoolean = (initialValue = false): UseBooleanReturnType => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((currentValue) => !currentValue), []);

  const on = useCallback(() => setValue(true), []);

  const off = useCallback(() => setValue(false), []);

  return [value, { setValue, toggle, on, off }];
};

export default useBoolean;
