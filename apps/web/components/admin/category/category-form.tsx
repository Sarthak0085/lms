"use client";

import * as z from "zod";
import { CreateCategorySchema, UpdateCategorySchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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
    Input
} from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { useForm } from "react-hook-form";
import { ReactNode } from "react";

type CategoryFormValues =
    z.infer<typeof CreateCategorySchema>
    | z.infer<typeof UpdateCategorySchema>;

interface CategoryFormProps {
    form: ReturnType<typeof useForm<CategoryFormValues>>;
    isPending: boolean;
    onSubmit: any;
    children: ReactNode;
}

export const CategoryForm = ({
    children,
    form,
    isPending,
    onSubmit
}: CategoryFormProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter Category Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Next Js"
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {children}
            </form>
        </Form>
    );
};
