import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@repo/ui";
import { UserForm } from "./user-form";
import { User } from "@repo/db/types";
import { Row } from "@tanstack/react-table";

interface EditUserModalProps {
    children?: React.ReactNode;
    asChild?: boolean;
    user: Row<User>["original"];
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const EditUserDialog = ({
    children,
    user,
    open,
    setOpen,
}: EditUserModalProps) => {
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger onClick={() => setOpen(!open)}>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <DialogTitle hidden>Edit User</DialogTitle>
                <UserForm data={user} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
};
