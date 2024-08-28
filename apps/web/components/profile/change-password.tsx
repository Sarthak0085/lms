"use client"

import { ChangePasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormField } from '@repo/ui';
import { RiLockPasswordLine } from '@repo/ui/icon';
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { CustomPasswordInput } from '../custom-password-input';

export const ChangePassword = () => {
    const [isPending, startTransition] = useTransition();
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({
        "oldPassword": false,
        "newPassword": false,
        "confirmPassword": false,
    });
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    const handleShowPassword = (key: string) => {
        setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOpen(true);
        setNewPassword(event.target.value);
        form.setValue('newPassword', event.target.value);
    };

    const passwordRequirements = {
        hasUppercase: /[A-Z]/.test(newPassword),
        hasLowercase: /[a-z]/.test(newPassword),
        hasNumber: /[0-9]/.test(newPassword),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
        length: newPassword.length >= 8,
    };

    const requirementsMet = Object.values(passwordRequirements).filter(Boolean).length;
    const totalRequirements = Object.keys(passwordRequirements).length;
    const progress = (requirementsMet / totalRequirements) * 100;

    const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
        startTransition(() => {

        })
    }

    return (
        <div className='w-full pl-6 px-2 825:px-5 825:pl-0'>
            <h1 className='block text-[25px] 825:text-[30px] font-Poppins text-center font-[500] pb-2 logo-style'>
                Change Password
            </h1>
            <div className='w-full'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='825:w-[50%] m-auto block pb-4 space-y-6'>
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <CustomPasswordInput
                                        label="Old Password"
                                        name="oldPassword"
                                        isPending={isPending}
                                        placeholder="********"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                        type="password"
                                        Icon={RiLockPasswordLine}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <CustomPasswordInput
                                        label="New Password"
                                        name="newPassword"
                                        isPending={isPending}
                                        placeholder="********"
                                        value={newPassword}
                                        handleChange={handlePasswordChange}
                                        onBlur={field.onBlur}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                        type="password"
                                        Icon={RiLockPasswordLine}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <CustomPasswordInput
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        isPending={isPending}
                                        placeholder="********"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        showPassword={showPassword}
                                        handleShowPassword={handleShowPassword}
                                        type="password"
                                        Icon={RiLockPasswordLine}
                                    />
                                )}
                            />
                            {open && <div className="mt-2">
                                <div className="relative bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-2 rounded-full"
                                        style={{ width: `${progress}%`, backgroundColor: progress === 100 ? 'green' : progress > 50 ? 'yellow' : 'red' }}
                                    ></div>
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    <ul className="list-disc list-inside">
                                        <li className={passwordRequirements.hasUppercase ? 'text-green-500' : 'text-red-500'}>
                                            {passwordRequirements.hasUppercase ? '✓' : '✗'} Contains uppercase letter
                                        </li>
                                        <li className={passwordRequirements.hasLowercase ? 'text-green-500' : 'text-red-500'}>
                                            {passwordRequirements.hasLowercase ? '✓' : '✗'} Contains lowercase letter
                                        </li>
                                        <li className={passwordRequirements.hasNumber ? 'text-green-500' : 'text-red-500'}>
                                            {passwordRequirements.hasNumber ? '✓' : '✗'} Contains number
                                        </li>
                                        <li className={passwordRequirements.hasSpecial ? 'text-green-500' : 'text-red-500'}>
                                            {passwordRequirements.hasSpecial ? '✓' : '✗'} Contains special character
                                        </li>
                                        <li className={passwordRequirements.length ? 'text-green-500' : 'text-red-500'}>
                                            {passwordRequirements.length ? '✓' : '✗'} At least 8 characters long
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                            <Button
                                type='submit'
                                variant={"primary"}
                                className='w-full 825:w-[200px] h-[40px] '
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}