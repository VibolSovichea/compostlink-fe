import { createListCollection, Field } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  type SelectRootProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

interface MSelectProps extends Omit<SelectRootProps, "collection" | "onValueChange" | "onChange"> {
  options: string[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
}

const MSelect = forwardRef<HTMLDivElement, MSelectProps>(
  ({ options, placeholder, label, value, required, helperText, onChange, ...props }, ref) => {
    const collection = createListCollection({ items: options });

    return (
      <SelectRoot
        ref={ref}
        value={value}
        onValueChange={(details) => onChange?.(details.value[0])}
        collection={collection}
        required={required}
        {...props}
      >
        {label && <SelectLabel className="text-text_dark">{label}</SelectLabel>}
        <SelectTrigger className="bg-background h-12 p-2 text-text_dark">
          <SelectValueText placeholder={placeholder || options[0]} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} item={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
        <Field.Root>
          <Field.HelperText className="text-sm text-text_dark">{helperText}</Field.HelperText>
        </Field.Root>
      </SelectRoot>
    );
  }
);

MSelect.displayName = "MSelect";

export default MSelect;
