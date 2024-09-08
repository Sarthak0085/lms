import { createSection } from "@/actions/sections/create-section";
import { CustomInput } from "@/components/custom-input"
import { CourseSectionSchema, SectionContentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Content } from "@repo/db/types";
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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    Switch,
    toast
} from "@repo/ui"
import { PlusCircledIcon, ReloadIcon } from "@repo/ui/icon";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SectionDialogProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    section: Content | null;
    sectionLength: number;
    courseId: string;
}

export const SectionDialog = ({
    section,
    sectionLength,
    courseId,
    open,
    setOpen
}: SectionDialogProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    console.log("section", section);
    const form = useForm<z.infer<typeof SectionContentSchema>>({
        resolver: zodResolver(SectionContentSchema),
        defaultValues: {
            courseId: courseId,
            title: section?.title ?? "",
            type: section?.type ?? "FOLDER",
            position: section?.position ?? sectionLength,
            hidden: section?.hidden ?? false,
            ...(section && {
                id: section?.id ?? "",
                parentId: section?.parentId ?? "",
                description: section?.description ?? "",
                thumbnail: section?.thumbnail ?? ""
            })
        },
    });

    const onSubmit = (values: z.infer<typeof SectionContentSchema>) => {
        console.log(values)
        startTransition(() => {
            createSection(values)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: data?.error,
                        });
                    }
                    if (data?.success) {
                        setOpen(false);
                        form.reset();
                        toast({
                            variant: "success",
                            title: "Success!!",
                            description: data?.success
                        });
                        router.push(`/admin/course/${courseId}/sections/${data?.section?.id}`);
                    }
                }).catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with creating the course section.",
                    });
                })
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger>
                <Button variant="primary" className="ml-auto !justify-end">
                    <PlusCircledIcon className="mr-2 size-4" aria-hidden="true" />
                    Add New Section
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        <h1 className="font-bold logo-style">
                            Add New Section
                        </h1>
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Fill in the details below to Create New Section.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-8 mt-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <CustomInput
                                    label='Section Name'
                                    name={field.name}
                                    value={field.value}
                                    placeholder='Introduction'
                                    type="text"
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    isPending={isPending}
                                    required={true}
                                />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hidden"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Accessibility</FormLabel>
                                        <FormDescription>
                                            This section should not visible to the user
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter className="gap-2 pt-3 ">
                    <div className="w-full flex items-center justify-between">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                disabled={isPending}
                                variant="destructive"
                                className="sm:w-[30%] w-auto"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isPending}
                            variant={"primary"}
                            className={cn("sm:w-[30%] w-auto", isPending && "!cursor-not-allowed")}
                            onClick={() => onSubmit(form.getValues())}
                        >
                            {isPending && (
                                <ReloadIcon
                                    className="mr-2 size-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            Create
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}