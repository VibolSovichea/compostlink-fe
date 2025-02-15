import { Input, InputProps } from "@chakra-ui/react"
import React from "react";
import { Field } from "@chakra-ui/react";
import clsx from "clsx";

interface MFormInputProp {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  inputProps?: InputProps;
  helperText?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MFormInput = React.forwardRef<HTMLInputElement, MFormInputProp>((props, ref) => {
  const {
    label,
    name,
    type = "text",
    required,
    className,
    inputProps,
    helperText,
    placeholder,
    onChange,
  } = props;

  return (
    <Field.Root required={required}>
      <Field.Label className="text-sm text-black">{label}</Field.Label>
      <Input
        {...inputProps}
        name={name}
        ref={ref}
        placeholder={placeholder}
        type={type}
        className={clsx("border-2 border-gray-300 rounded-md p-2 bg-white text-black active:bg-white", className)}
        onChange={onChange}
      />
      <Field.HelperText>{helperText}</Field.HelperText>
    </Field.Root>
  )
})

MFormInput.displayName = "MFormInput";

export default MFormInput;