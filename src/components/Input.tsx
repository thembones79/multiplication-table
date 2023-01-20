import { ComponentProps, useRef, useEffect } from "react";

interface InputProps extends ComponentProps<"input"> {
  autofocus?: boolean;
}

export const Input = ({ autofocus, ...rest }: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    autofocus && ref.current?.focus();
  }, []);
  return <input {...rest} />;
};
