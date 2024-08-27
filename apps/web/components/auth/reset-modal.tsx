"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@repo/ui";
import { PasswordResetForm } from "@/components/auth/password-reset-form";

interface PasswordResetModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setRoute: (route: string) => void;
}

export const PasswordResetModal = ({
    open,
    setOpen,
    setRoute,
}: PasswordResetModalProps) => {
    return (
        <Dialog defaultOpen={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger onClick={() => { setOpen(true) }} />
            <DialogContent className="border-none w-[450px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none mx-2">
                <DialogTitle hidden aria-hidden>Register Form</DialogTitle>
                <PasswordResetForm setRoute={setRoute} />
            </DialogContent>
        </Dialog>
    );
}
