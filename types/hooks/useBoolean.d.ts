import { Dispatch, SetStateAction } from 'react';
type UseBooleanReturnType = [
    boolean,
    {
        setValue: Dispatch<SetStateAction<boolean>>;
        toggle: () => void;
        on: () => void;
        off: () => void;
    }
];
declare const useBoolean: (initialValue?: boolean) => UseBooleanReturnType;
export default useBoolean;
