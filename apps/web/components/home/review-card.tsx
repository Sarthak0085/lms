import React from 'react';
import { Ratings } from '@/components/ratings';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@repo/ui';
import { FaUser } from '@repo/ui/icon';

type Item = {
    name: string;
    avatar: string;
    profession: string;
    comment: string;
    ratings: number
}

interface ReviewCardProps {
    item: Item
}

export const ReviewCard = ({ item }: ReviewCardProps) => {
    return (
        <Card className="w-full min-h-[35px] dark:bg-slate-500 dark:bg-opacity-20 backdrop:blur border border-[#00000015] dark:border-[#ffffff16] rounded-lg p-2 shadow-sm dark:shadow-[bg-slate-300] dark:shadow-inner">
            <CardHeader>
                <div className='w-full flex items-center'>
                    <Avatar className='w-[50px] h-[50px] object-cover rounded-full'>
                        <AvatarImage src={item?.avatar} alt={"User's Avatar"} />
                        <AvatarFallback className='bg-sky-500'>
                            <FaUser size={23} color='white' />
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex w-full justify-between'>
                        <div className='pl-4'>
                            <CardTitle className='text-black dark:text-white'>{item?.name}</CardTitle>
                            <CardDescription className='text-muted-foreground font-medium'>{item?.profession}</CardDescription>
                        </div>
                        <div className='hidden lg:block'>
                            <Ratings rating={item?.ratings} />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='pt-2 font-Poppins text-black dark:text-white'>
                {item?.comment}
            </CardContent>
        </Card>
    )
}
