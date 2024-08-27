"use client"

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from '@/schemas';
import { CardWrapper } from '@/components/auth/card-wrapper';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { IoEyeOffOutline, IoEyeOutline } from '@repo/ui/icon';

interface LoginFormProps {
    setRoute: (route: string) => void;
}

export const LoginForm = ({ setRoute }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            // login(values)
            //     .then((data) => {
            //         if (data?.error) {
            //             setError(data?.error);
            //         }
            //         if (data?.success) {
            //             setSuccess(data?.success);
            //             window.location.reload();
            //         }
            //         if (data?.twoFactor) {
            //             setShowTwoFactor(true);
            //         }
            //     })
            //     .catch(() => setError("Something went wrong"));
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome Back to E-Learning"
            backButtonLabel="Don't have an account? signup"
            backButtonHref="register"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 !bg-transparent">
                    {showTwoFactor && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="123456"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                    {!showTwoFactor && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="johnDoe123@gmail.com"
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="********"
                                                    type={showPassword ? "text" : "password"}
                                                />
                                                <div
                                                    className="absolute cursor-pointer !right-2 !bottom-2"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                >
                                                    {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                                                    <span className="sr-only">Show Password</span>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        <Button
                                            size={"sm"}
                                            variant={"link"}
                                            asChild
                                            className="px-0 font-normal !underline"
                                            onClick={() => setRoute("reset")}
                                        >
                                            forgot password?
                                        </Button>
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" variant={"primary"} disabled={isPending} className="!w-full ">
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
