import { FormControl, FormItem, FormLabel, FormMessage, Input, Textarea } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { ChangeEvent, forwardRef } from "react";

interface CustomInputProps {
    isPending: boolean;
    Icon?: React.ComponentType<{ size?: number }>;
    name: string;
    type: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    label: string;
    handleChange?: (event: any) => void;
    placeholder: string;
    required?: boolean;
    rows?: number;
    labelClassName?: string;
    inputClassName?: string;
}

const CustomInput = forwardRef<any, CustomInputProps>(({
    isPending,
    Icon,
    name,
    value,
    onChange,
    onBlur,
    handleChange,
    type,
    placeholder,
    label,
    required = false,
    rows = 0,
    labelClassName,
    inputClassName
}, ref) => (
    <FormItem>
        <FormLabel htmlFor={name} className={labelClassName}>
            {label}
            {required && <span className="text-[crimson] ms-2">*</span>}
        </FormLabel>
        <FormControl>
            <div className="relative">
                {!rows && <Input
                    ref={ref as any}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange ?? handleChange}
                    onBlur={onBlur}
                    disabled={isPending}
                    className={cn(inputClassName, Icon && "pl-10 pr-6")}
                    placeholder={placeholder}
                    type={type}
                />}
                {rows !== 0 && <Textarea
                    ref={ref as any}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={isPending}
                    className={cn(Icon && "pl-10 pr-2")}
                    placeholder={placeholder}
                    rows={rows}
                />
                }
                {Icon &&
                    <div
                        className="absolute cursor-pointer top-0 left-0 translate-x-1/2 translate-y-1/2"
                    >
                        <Icon size={20} />
                        <span className="sr-only">{name}</span>
                    </div>
                }
            </div>
        </FormControl>
        <FormMessage />
    </FormItem>

));

CustomInput.displayName = "CustomInput";

export { CustomInput };