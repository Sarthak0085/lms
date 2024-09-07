import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    toast
} from "@repo/ui";
import { CategoryForm } from "./category-form";
import { z } from "zod";
import { Row } from "@tanstack/react-table";
import { Category } from "@repo/db/types";
import { PlusIcon, ReloadIcon } from "@repo/ui/icon";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { CreateCategorySchema, UpdateCategorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCategory } from "@/actions/category/edit-category";
import { createCategory } from "@/actions/category/create-category";
import { cn } from "@repo/ui/lib/utils";

type CategoryFormValues =
    z.infer<typeof CreateCategorySchema>
    | z.infer<typeof UpdateCategorySchema>;

interface CategoryDialogProps
    extends React.ComponentPropsWithoutRef<typeof Dialog> {
    isUpdate?: boolean;
    data?: Row<Category>["original"];
}

export const CategoryDialog = ({
    data,
    isUpdate = false,
    ...props
}: CategoryDialogProps) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(
            isUpdate ? UpdateCategorySchema : CreateCategorySchema
        ),
        defaultValues: {
            name: data?.name || "",
            ...(isUpdate && {
                categoryId: data?.id || "",
                userId: data?.userId || "",
            }),
        },
    });

    const onSubmit = (values: CategoryFormValues) => {
        startTransition(() => {
            if (isUpdate) {
                editCategory(values as z.infer<typeof UpdateCategorySchema>)
                    .then((data) => {
                        if (data?.error) {
                            toast({
                                variant: "destructive",
                                title: "Uh oh! Something went wrong.",
                                description: data.error,
                            });
                        }
                        if (data?.success) {
                            form.reset();
                            props.onOpenChange?.(false);
                            toast({
                                variant: "success",
                                title: "Success!!",
                                description: data?.success,
                            });
                        }
                    })
                    .catch(() =>
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with creating the category.",
                        })
                    );
            } else {
                createCategory(values)
                    .then((data) => {
                        if (data?.error) {
                            toast({
                                variant: "destructive",
                                title: "Uh oh! Something went wrong.",
                                description: data.error,
                            });
                        }
                        if (data?.success) {
                            form.reset();
                            props.onOpenChange?.(false);
                            toast({
                                variant: "success",
                                title: "Success!!",
                                description: data?.success,
                            });
                        }
                    })
                    .catch(() =>
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with updating the category.",
                        })
                    );
            }
        });
    };

    return (
        <Dialog {...props}>
            {!isUpdate && <DialogTrigger asChild className="pt-0">
                <Button aria-label="Create Category" variant="primary" size="sm" className="ml-auto hidden !h-8 lg:flex">
                    <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                    Create
                </Button>
            </DialogTrigger>}
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>
                        <h2 className="font-bold logo-style">
                            {isUpdate ? "Update Category" : "Create Category"}
                        </h2>
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Fill in the details below to {isUpdate ? "update category" : "create category"}.
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm
                    form={form}
                    isPending={isPending}
                    onSubmit={onSubmit}
                >
                    <DialogFooter className="gap-2 pt-3 ">
                        <div className="w-full flex items-center justify-between">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    disabled={isPending}
                                    variant="destructive"
                                    className="sm:w-[30%] w-auto"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit"
                                disabled={isPending}
                                variant={"primary"}
                                className={cn("sm:w-[30%] w-auto", isPending && "!cursor-not-allowed")}
                            >
                                {isPending && (
                                    <ReloadIcon
                                        className="mr-2 size-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                )}
                                {isUpdate ? "Update" : "Create"}
                            </Button>
                        </div>
                    </DialogFooter>
                </CategoryForm>
            </DialogContent>
        </Dialog>
    );
};
