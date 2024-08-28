"use client"

import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { ProfileInfoSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarFallback, AvatarImage, Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label } from '@repo/ui';
import { AiOutlineCamera, AiOutlineUser, FaUser, MdOutlineEmail } from '@repo/ui/icon';

interface ProfileInfoProps {
    user?: any
}

export const ProfileInfo = ({ user }: ProfileInfoProps) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ProfileInfoSchema>>({
        resolver: zodResolver(ProfileInfoSchema),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
        }
    });

    // const imageHandler = async (e: any) => {
    //     // const file = e.target.files[0];
    //     const fileReader = new FileReader();
    //     fileReader.onload = () => {
    //         if (fileReader.readyState === 2) {
    //             const avatar = fileReader.result;
    //             updateAvatar(
    //                 avatar
    //             )
    //         }
    //     }

    //     fileReader.readAsDataURL(e.target.files[0]);
    // }

    const onSubmit = () => { }

    return (
        <div className='w-full pl-6 825:pl-8'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='w-full flex justify-center mb-7'>
                        <div className='relative justify-center'>
                            <Avatar
                                className={"w-[120px] h-[120px] rounded-full cursor-pointer border border-[#37a39a]"}
                            >
                                <AvatarImage src={user?.avatar} alt="Avatar" />
                                <AvatarFallback className="bg-sky-500">
                                    <FaUser size={50} color='white' />
                                </AvatarFallback>
                            </Avatar>
                            <Input
                                type='file'
                                name='avatar'
                                id='avatar'
                                className='hidden'
                                accept='image/jpg image/png image/jpeg image/webp'
                            // onChange={imageHandler}
                            />
                            <Label
                                htmlFor='avatar'
                            >
                                <div className='w-[30px] h-[30px] dark:bg-slate-900 bg-white rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                                    <AiOutlineCamera
                                        size={20}
                                        className="z-1 dark:text-white text-black"
                                    />
                                </div>
                            </Label>
                        </div>
                    </div>
                    <div className='825:w-[50%] m-auto block pb-4'>
                        <div className='w-[100%]'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="John Doe"
                                                    type="text"
                                                    className="pl-10 pr-6"
                                                />
                                                <div
                                                    className="absolute left-0 top-0 translate-y-1/2 translate-x-1/2"
                                                >
                                                    <AiOutlineUser size={20} />
                                                    <span className="sr-only">Name</span>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-[100%] py-6'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="John.doe@gmail.com"
                                                    type="email"
                                                    readOnly
                                                    className="pl-10 pr-6"
                                                />
                                                <div
                                                    className="absolute left-0 top-0 translate-y-1/2 translate-x-1/2"
                                                >
                                                    <MdOutlineEmail size={20} />
                                                    <span className="sr-only">Email</span>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
    )
}
