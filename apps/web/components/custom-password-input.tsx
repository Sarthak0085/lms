import { FormControl, FormItem, FormLabel, FormMessage, Input } from "@repo/ui";
import { IoEyeOffOutline, IoEyeOutline } from "@repo/ui/icon";
import { ChangeEvent } from "react";

interface CustomPasswordInputProps {
    isPending: boolean;
    showPassword: { [key: string]: boolean };
    handleShowPassword: (key: string) => void;
    Icon: React.ComponentType<{ size?: number }>;
    name: string;
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    label: string;
    handleChange?: (event: any) => void;
    placeholder?: string;
}

export const CustomPasswordInput = ({
    isPending,
    showPassword,
    Icon,
    name,
    value,
    onChange,
    onBlur,
    handleChange,
    handleShowPassword,
    type,
    placeholder,
    label
}: CustomPasswordInputProps) => {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div className="relative">
                    <Input
                        name={name}
                        value={value}
                        onChange={onChange ?? handleChange}
                        onBlur={onBlur}
                        disabled={isPending}
                        className="px-10"
                        placeholder={placeholder}
                        type={showPassword[name] ? "text" : "password"}
                    />
                    <div
                        className="absolute cursor-pointer top-0 left-0 translate-x-1/2 translate-y-1/2"
                    >
                        <Icon size={20} />
                        <span className="sr-only">{name}</span>
                    </div>
                    <div
                        className="absolute cursor-pointer top-0 right-0 -translate-x-1/2 translate-y-1/2"
                        onClick={() => handleShowPassword(name)}
                    >
                        {showPassword[name] ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                        <span className="sr-only">Show Password</span>
                    </div>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>

    )
}