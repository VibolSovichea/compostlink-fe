import { IconButton, Input, InputProps } from "@chakra-ui/react"
import React, { useState } from "react";
import { Field } from "@chakra-ui/react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface MFormInputProp {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  inputProps?: InputProps;
  helperText?: string;
  placeholder?: string;
  password?: boolean;
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
    password,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field.Root required={required}>
      <Field.Label className="text-sm text-black">
        {label}
        {required && <Field.RequiredIndicator />}
      </Field.Label>
      {
        password ? (
          <>
            <Input
              {...inputProps}
              name={name}
              ref={ref}
              placeholder={placeholder}
              type={showPassword ? "text" : "password"}
              className={clsx("border-2 border-gray-300 rounded-md p-2 bg-white text-black active:bg-white", className)}
              onChange={onChange}
            />
            {
              showPassword ? (
                <div className="absolute top-[36px] right-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                  <Eye size={20} />
                </div>
              ) : (
                <div className="absolute top-[36px] right-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                  <EyeOff size={20} />
                </div>
              )
            }
          </>
        ) : (
          <Input
            {...inputProps}
            name={name}
            ref={ref}
            placeholder={placeholder}
            type={type}
            className={clsx("border-2 border-gray-300 rounded-md p-2 bg-white text-black active:bg-white", className)}
            onChange={onChange}
          />
        )
      }
      {
        helperText && (
          <Field.HelperText className="text-sm text-gray-500">{helperText}</Field.HelperText>
        )
      }
    </Field.Root>
  )
})

MFormInput.displayName = "MFormInput";

export default MFormInput;