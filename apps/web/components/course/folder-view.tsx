'use client';

import { Content, ContentType } from '@repo/db/types';
import { Checkbox } from '@repo/ui';
import { ChevronDown, FileIcon, TvMinimalPlayIcon } from '@repo/ui/icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const FolderView = ({
    courseContent,
    courseId,
}: {
    courseId: number;
    // rest: string[];
    courseContent: Content[];
}) => {
    const [open, setOpen] = useState<{ [key: string]: boolean }>(
        courseContent
            .filter(content => content.type === ContentType.FOLDER)
            .reduce((acc, content) => {
                acc[content?.id] = false;
                return acc;
            }, {} as { [key: string]: boolean })
    );

    const handleOpenChange = (id: string) => {
        setOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }
    const router = useRouter();

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courseContent.filter(content => content.type === ContentType.FOLDER).map((content) => {
                    // const videoProgressPercent =
                    //     content.type === ContentType.VIDEO &&
                    //         content.videoFullDuration &&
                    //         content.duration
                    //         ? (content.duration / content.videoFullDuration) * 100
                    //         : 0;
                    return (
                        // <ContentCard
                        //     type={content.type}
                        //     contentId={content.id}
                        //     key={content.id}
                        //     title={content.title}
                        //     image={content.image || ''}
                        //     onClick={() => {
                        //         router.push(`${updatedRoute}/${content.id}`);
                        //     }}
                        //     markAsCompleted={content.markAsCompleted}
                        //     percentComplete={content.percentComplete}
                        //     videoProgressPercent={videoProgressPercent}
                        //     bookmark={content.bookmark}
                        //     contentDuration={content.videoFullDuration}
                        // />
                        content?.type === ContentType.FOLDER &&
                        <div
                            className="w-full bg-white/60 flex flex-col dark:bg-black/30 border-t border-black/20 dark:border-white/20 rounded-lg text-sm font-medium p-3 my-4 cursor-pointer"
                            onClick={() => handleOpenChange(content.id)}
                        >
                            <div className='flex items-center justify-between'>
                                <h3 className='truncate font-bold'>
                                    Section {content?.position}. {content.title}
                                </h3>
                                <ChevronDown className='size-4' />
                            </div>
                            {open[content.id] &&
                                content.type !== ContentType.FOLDER &&
                                courseContent.filter(cont => cont.type !== ContentType.FOLDER && cont.parentId === content?.id).map((content, index) => (
                                    <Link key={content?.id} href={`/course/${courseId}/sections/${content?.id}`}>
                                        <Checkbox />
                                        <div className='w-full flex flex-col hover:bg-gray-500'>
                                            <h3 className='font-normal'>
                                                {index}. {content?.title}
                                            </h3>
                                            <div className='flex gap-2'>
                                                {content?.type === ContentType.VIDEO ? <TvMinimalPlayIcon className='size-4' /> : <FileIcon className='size-4' />}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>

                    );
                })}
            </div>
        </div >
    );
};