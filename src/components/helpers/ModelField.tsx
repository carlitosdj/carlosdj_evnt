import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import MaskedInput from "react-maskedinput";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  placeholder: string;
  //value: string;
  formControl: Control<any>;
  disabled?: boolean;
  label?: string;
  className?: string;
  onChange?: (e: any) => void;
  mask?: string;
}

const ModelField = ({
  name,
  placeholder,
  //value,
  formControl,
  disabled = false,
  label,
  className = "col-span-4",
  onChange,
  mask,
}: Props) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="text-start">{label}</FormLabel>}
          <FormControl className="border-0" onChange={onChange}>
            <>
              {!mask && (
                <Input
                  disabled={disabled}
                  placeholder={placeholder}
                  {...field}
                  //onChange={onChange}
                />
              )}
              {mask && (
                <MaskedInput
                  className={cn(
                    "flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                  )}
                  mask={mask}
                  disabled={disabled}
                  placeholder={placeholder}
                  {...field}
                  onChange={onChange}
                />
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ModelField;
