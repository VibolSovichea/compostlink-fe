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
      <Field.Label className="text-sm text-text_dark">
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
              className={clsx("rounded-md p-2 bg-background text-text_dark active:bg-white h-12", className)}
              onChange={onChange}
            />
            {
              showPassword ? (
                <div className="absolute top-[40px] right-2 text-text_dark" onClick={() => setShowPassword(!showPassword)}>
                  <Eye size={20} />
                </div>
              ) : (
                <div className="absolute top-[40px] right-2 text-text_dark" onClick={() => setShowPassword(!showPassword)}>
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
            className={clsx("rounded-md p-2 bg-background text-text_dark active:bg-white h-12", className)}
            onChange={onChange}
          />
        )
      }
      {
        helperText && (
          <Field.HelperText className="text-sm text-text_dark">{helperText}</Field.HelperText>
        )
      }
    </Field.Root>
  )
})

MFormInput.displayName = "MFormInput";

export default MFormInput;