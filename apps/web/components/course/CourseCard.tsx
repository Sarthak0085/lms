import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Ratings } from '@/components/ratings';
import { AiOutlineUnorderedList } from '@repo/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';

type Props = {
    item: any;
    isProfile?: boolean
}

const CourseCard: React.FC<Props> = ({ item, isProfile }) => {
    return (
        <Link href={isProfile ? `/course-access/${item._id}` : `/course/${item._id}`}>
            <Card className="w-full min-h-[35px] dark:bg-slate-500 dark:bg-opacity-20 backdrop:blur border border-[#00000015] dark:border-[#ffffff16] rounded-lg shadow-sm dark:shadow-[bg-slate-300] dark:shadow-inner hover:scale-105">
                <Image src={item?.thumbnail?.url} alt='thumbnail' width={500} height={300} objectFit='contain' className='rounded-lg' />
                <CardHeader>
                    <CardTitle className='font-Poppins text-[16px] text-black dark:text-white'>
                        {item?.name}
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
                                {item?.courseData?.length} Lectures
                            </h4>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CourseCard