"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@repo/ui";
import { RegisterForm } from "@/components/auth/register-form";

interface RegisterModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setRoute: (route: string) => void;
}

export const RegisterModal = ({
    open,
    setOpen,
    setRoute,
}: RegisterModalProps) => {
    return (
        <Dialog defaultOpen={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger onClick={() => { setOpen(true) }} />
            <DialogContent className="border-none w-[450px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none mx-2">
                <DialogTitle hidden aria-hidden>Register Form</DialogTitle>
                <RegisterForm setRoute={setRoute} />
            </DialogContent>
        </Dialog>
    );
}
