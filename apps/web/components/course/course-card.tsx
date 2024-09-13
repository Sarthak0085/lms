import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Ratings } from '@/components/ratings';
import { AiOutlineUnorderedList } from '@repo/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';
import { ExtendCourse } from '@/types';

interface CourseCardProps {
    item: ExtendCourse;
    isProfile?: boolean
}

const CourseCard = ({ item, isProfile = false }: CourseCardProps) => {
    const folders = item.content?.filter((con) => con.type === "FOLDER" && con.hidden === false);
    return (
        <Link href={isProfile ? `/course/${item?.id}/sections` : `/course/${item?.id}`}>
            <Card className="w-full min-h-[35px] dark:bg-slate-500 dark:bg-opacity-20 backdrop:blur border border-[#00000015] dark:border-[#ffffff16] rounded-lg shadow-sm dark:shadow-[bg-slate-300] dark:shadow-inner hover:scale-105">
                <Image
                    src={item?.thumbnail}
                    alt='thumbnail'
                    width={500}
                    height={300}
                    objectFit='contain'
                    className='rounded-lg'
                />
                <CardHeader>
                    <CardTitle className='font-Poppins text-[16px] text-black dark:text-white'>
                        {item?.title}
                    </CardTitle>
                    <CardDescription className='font-poppins text-[14px] text-muted-foreground'>
                        {item?.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex w-full item-center justify-between'>
                        <Ratings rating={item?.ratings} />
                        <h4 className={`text-black dark:text-white ${isProfile && "800px:inline hidden"}`}>
                            {item?.purchased} Students
                        </h4>
                    </div>
                    <div className='flex w-full item-center justify-between pt-2'>
                        <div className='flex'>
                            <h3 className='text-blue-500'>{item?.price}</h3>
                            <h5 className={`pl-3 mt-[-5px] text-[crimson] opacity-80 line-through text-[14px]`}>
                                {item?.estimatedPrice}
                            </h5>
                        </div>
                        <div className='flex'>
                            <AiOutlineUnorderedList size={20} className="text-black dark:text-white" />
                            <h4 className={`pl-2 text-black dark:text-white`}>
                                {item.content?.filter((con) => con.type !== "FOLDER" && con.hidden === false && folders?.find((fol) => fol.id === con.parentId)).length} Lectures
                            </h4>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CourseCard