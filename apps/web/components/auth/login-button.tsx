"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@repo/ui";

interface LoginButtonProps {
    children?: React.ReactNode;
    mode?: "Modal" | "Redirect";
    asChild?: boolean;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

export const LoginButton = ({
    children,
    mode,
    open,
    setOpen
}: LoginButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    };

    if (mode === "Modal") {
        return (
            <Dialog defaultOpen={open} onOpenChange={() => { setOpen && setOpen(!open) }}>
                <DialogTrigger onClick={() => { setOpen && setOpen(true) }} />
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <DialogTitle hidden aria-hidden>Login Form</DialogTitle>
                    <LoginForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
}
