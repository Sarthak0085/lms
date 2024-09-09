'use client';

import { Content, ContentType } from '@repo/db/types';
import { Checkbox } from '@repo/ui';
import { ChevronDown, FileIcon, TvMinimalPlayIcon } from '@repo/ui/icon';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const FolderView = ({
    courseContent,
    courseId,
}: {
    courseId: string;
    courseContent: (Content & { children: Content[] })[] | [];
}) => {
    const { sectionId } = useParams();
    console.log("Params", courseId, sectionId);
    const [open, setOpen] = useState<{ [key: string]: boolean }>(
        courseContent
            .filter(content => content.type === ContentType.FOLDER)
            .reduce((acc, content) => {
                acc[content?.id] = content?.children?.findIndex((con) => con.id === sectionId) !== -1 ? true : false;
                return acc;
            }, {} as { [key: string]: boolean })
    );

    const handleOpenChange = (id: string) => {
        console.log("clicked");
        setOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }
    const router = useRouter();
    const sectionChaptersCount = (id: string) => {
        return courseContent.filter(content => content.parentId === id).length;
    }

    if (!courseContent?.length) {
        return (
            <div className="mt-64 flex">
                <div className="m-auto">No content here yet!</div>
            </div>
        );
    }
    // let updatedRoute = `/courses/${courseId}`;
    // for (let i = 0; i < rest.length; i++) {
    //     updatedRoute += `/${rest[i]}`;
    // }
    // why? because we have to reset the segments or they will be visible always after a video

    return (
        <div>
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> */}
            {courseContent.filter(content => content.type === ContentType.FOLDER).map((content, index) => {
                // const videoProgressPercent =
                //     content.type === ContentType.VIDEO &&
                //         content.videoFullDuration &&
                //         content.duration
                //         ? (content.duration / content.videoFullDuration) * 100
                //         : 0;
                return (
                    <>
                        <div
                            key={content?.id}
                            className="w-full bg-white/60 flex flex-col dark:bg-black/30 border-t border-black/20 dark:border-white/20 px-4 h-[70px] font-medium cursor-pointer"
                            onClick={() => handleOpenChange(content.id)}
                        >
                            <div className='h-full flex flex-col justify-center'>
                                <div className='w-full flex items-center justify-between'>
                                    <h3 className='truncate'>
                                        Section {index + 1}. {content.title}
                                    </h3>
                                    <ChevronDown className='size-4' />
                                </div>
                                <div className='px-3'>
                                    {sectionChaptersCount(content?.id)}
                                </div>
                            </div>
                        </div>
                        {
                            open[content?.id] &&
                            courseContent.filter(cont => cont?.type !== ContentType.FOLDER && cont?.parentId === content?.id)
                                .map((con, index) => (
                                    // <Link key={con?.id} href={`/course/${courseId}/sections/${con?.id}`} className='hover:bg-gray-500 '>
                                    <div
                                        key={con?.id}
                                        className={cn('flex gap-3 min-h-[60px] cursor-pointer hover:bg-gray-400 px-4', sectionId === con?.id && "bg-gray-400")}
                                        onClick={() => router.push(`/course/${courseId}/sections/${con?.id}`)}
                                    >
                                        <div className='mt-[11px]'>
                                            <Checkbox />
                                        </div>
                                        <div className='w-full flex flex-col justify-center'>
                                            <h3 className='font-normal truncate'>
                                                {index + 1}. {con?.title}
                                            </h3>
                                            <div className='flex gap-2'>
                                                {con?.type === ContentType.VIDEO ? <TvMinimalPlayIcon className='size-4' /> : <FileIcon className='size-4' />}
                                            </div>
                                        </div>
                                    </div>
                                    // </Link>
                                ))
                        }
                    </>
                );
            })}
        </div>
        // </div >
    );
};