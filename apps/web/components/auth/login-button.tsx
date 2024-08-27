"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@repo/ui/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";


interface LoginButtonProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setRoute: (route: string) => void;
}

export default function LoginButton({
    open,
    setOpen,
    setRoute
}: LoginButtonProps) {
    return (
        <Dialog defaultOpen={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger onClick={() => { setOpen(true) }} />
            <DialogContent className="border-none w-[450px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <DialogTitle hidden aria-hidden>Login Form</DialogTitle>
                <LoginForm setRoute={setRoute} />
            </DialogContent>
        </Dialog>
    );
}
