import { createListCollection } from "@chakra-ui/react";
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
  onChange?: (value: string) => void;
}

const MSelect = forwardRef<HTMLDivElement, MSelectProps>(
  ({ options, placeholder, label, value, onChange, ...props }, ref) => {
    const collection = createListCollection({ items: options });

    return (
      <SelectRoot
        ref={ref}
        value={value}
        onValueChange={(details) => onChange?.(details.value[0])}
        collection={collection}
        {...props}
      >
        {label && <SelectLabel>{label}</SelectLabel>}
        <SelectTrigger>
          <SelectValueText placeholder={placeholder || options[0]} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} item={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    );
  }
);

MSelect.displayName = "MSelect";

export default MSelect;
