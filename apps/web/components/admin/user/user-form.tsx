import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import {
    User,
    UserRole,
    UserStatus
} from "@repo/db/types";
import { EditUserSchema } from "@/schemas";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    toast
} from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { getRoleIcon, getStatusIcon } from "@/lib/utils";
import { editUser } from "@/actions/user/edit-user";

interface UserFormProps {
    data: User;
    setOpen: (open: boolean) => void;
}

export const UserForm = ({ data, setOpen }: UserFormProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof EditUserSchema>>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            userId: data?.id ?? "",
            role: data?.role ?? UserRole.USER,
            status: data?.status ?? UserStatus.ACTIVE,
        },
    });

    const onSubmit = (values: z.infer<typeof EditUserSchema>) => {
        console.log("values :", values);
        startTransition(() => {
            editUser(values)
                .then((data) => {
                    if (data?.success) {
                        toast({
                            variant: "success",
                            title: "Success!!",
                            description: data.success
                        })
                        setOpen(false);
                    }
                    if (data?.error) {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: data.error
                        })
                    }
                })
                .catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was an issue with your request."
                    })
                });
        });
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-2xl font-semibold text-center">Edit User</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4 min-w-[400px]">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={isPending}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.values(UserRole).map((role) => {
                                                            const Icon = getRoleIcon(role);
                                                            return (
                                                                <SelectItem
                                                                    key={role}
                                                                    value={role}
                                                                >
                                                                    <div className={cn("flex items-center",
                                                                        role === UserRole.USER && "text-sky-600",
                                                                        role === UserRole.ADMIN && "text-[#e62fe6e4]"
                                                                    )}>
                                                                        <Icon
                                                                            className={cn("mr-2 size-5 text-muted-foreground",
                                                                                role === UserRole.USER && "text-sky-600",
                                                                                role === UserRole.ADMIN && "text-[#e62fe6e4]"
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        <span className="capitalize font-bold">{role}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            )
                                                        })
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-4 min-w-[400px]">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={isPending}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.values(UserStatus).map((status) => {
                                                            const Icon = getStatusIcon(status);
                                                            return (
                                                                <SelectItem
                                                                    key={status}
                                                                    value={status}
                                                                >
                                                                    <div className={cn("flex items-center",
                                                                        status === UserStatus.ACTIVE && "text-emerald-500",
                                                                        status === UserStatus.BLOCK && "text-[red]",
                                                                        status === UserStatus.ARCHIEVED && "text-muted-foreground"
                                                                    )}>
                                                                        <Icon
                                                                            className={cn("mr-2 size-5 text-muted-foreground",
                                                                                status === UserStatus.ACTIVE && "text-emerald-500",
                                                                                status === UserStatus.BLOCK && "text-[red]",
                                                                                status === UserStatus.ARCHIEVED && "text-muted-foreground"
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        <span className="capitalize font-bold">{status}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            )
                                                        })
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            variant={"primary"}
                            type="submit"
                            disabled={isPending}
                            className="w-full"
                        >
                            Edit
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
