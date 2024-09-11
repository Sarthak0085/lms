'use client';

import { formatDuration } from '@/lib/utils';
import { Content, ContentType, MarkAsCompleted, VideoMetadata, VideoProgress } from '@repo/db/types';
import { Checkbox, Progress, toast } from '@repo/ui';
import { ChevronDown, FileIcon, TvMinimalPlayIcon } from '@repo/ui/icon';
import { cn } from '@repo/ui/lib/utils';
import { User } from 'next-auth';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const FolderView = ({
    courseContent,
    courseId,
    user
}: {
    courseId: string;
    courseContent: (Content & {
        children: (Content & {
            markAsCompleted: MarkAsCompleted[],
            videoProgess: VideoProgress[],
            VideoMetadata: VideoMetadata,
        })[];
    })[];
    user: User | undefined;
}) => {
    const { sectionId } = useParams();
    const router = useRouter();
    const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>(
        courseContent?.filter(content => content.type === ContentType.FOLDER)
            ?.reduce((acc, content) => {
                if (content?.children) {
                    content.children.forEach(child => {
                        acc[child.id] = child.hidden === false && child.markAsCompleted
                            .some(c => c.userId === user?.id && c?.markAsCopleted === true) || false;
                    });
                }
                return acc;
            }, {} as { [key: string]: boolean })
    );
    const [open, setOpen] = useState<{ [key: string]: boolean }>(
        courseContent
            ?.filter(content => content.type === ContentType.FOLDER)
            ?.reduce((acc, content) => {
                acc[content?.id] = content?.children?.findIndex(con => con.id === sectionId) !== -1 ? true : false;
                return acc;
            }, {} as { [key: string]: boolean })
    );
    const handleOpenChange = (id: string) => {
        setOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }
    const sectionChaptersCount = (id: string) => {
        return courseContent.filter(content => content.parentId === id && content?.hidden === false).length;
    }

    const countMarkAsCompleted = () => {
        return Object.values(isChecked).filter(value => value === true).length;
    };

    const totalChapters = () => {
        const folders = courseContent?.filter((con) => con.type === ContentType.FOLDER && con.hidden === false);
        const chapters = folders?.flatMap((folder) => folder?.children?.filter(con => con.hidden === false)).length;
        return chapters;
    }

    if (!courseContent?.length) {
        return (
            <div className="mt-64 flex">
                <div className="m-auto">No content here yet!</div>
            </div>
        );
    }

    const handleMarkAsCompleted = async (event: React.MouseEvent, sectionId: string) => {
        event.stopPropagation();
        const prev = { ...isChecked };
        setIsChecked(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
        const response = await fetch(`/api/courses/${courseId}/sections/${sectionId}/markAsCompleted`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log(response)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Error while updating the mark as completed",
            });
            setIsChecked(prev);
        }
    }

    return (
        <div>
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> */}
            <div className='flex flex-col items-center space-y-4 px-2 my-4'>
                <Progress value={(countMarkAsCompleted() / totalChapters()) * 100} />
                <div className='text-[16px] font-semibold'>
                    {countMarkAsCompleted()}/{totalChapters()} lessons learned
                </div>
            </div>
            {courseContent?.filter(content => content?.type === ContentType.FOLDER && content?.hidden === false)?.map((content, index) => {
                return (
                    <>
                        <Progress key={index} className='!h-[4px] !rounded-none' value={(countMarkAsCompleted() / sectionChaptersCount(content?.id)) * 100} />
                        <div
                            key={content?.id}
                            className={cn("w-full bg-white/60 flex flex-col dark:bg-black/30 px-4 h-[70px] font-medium cursor-pointer",
                            )}
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
                                    {countMarkAsCompleted()}/{sectionChaptersCount(content?.id)}
                                </div>
                            </div>
                        </div>
                        {
                            open[content?.id] &&
                            content?.children?.filter(cont => cont?.type !== ContentType.FOLDER && cont?.parentId === content?.id && content?.hidden === false)
                                .map((con, index) => (
                                    <div
                                        key={con?.id}
                                        className={cn('flex gap-3 min-h-[60px] cursor-pointer hover:bg-gray-400 px-4', sectionId === con?.id && "bg-gray-400")}
                                        onClick={() => router.push(`/course/${courseId}/sections/${con?.id}`)}
                                    >
                                        <div className='mt-[11px]'>
                                            <Checkbox checked={isChecked[con?.id]} onClick={(e) => handleMarkAsCompleted(e, con?.id)} />
                                        </div>
                                        <div className='w-full flex flex-col justify-center'>
                                            <h3 className='font-normal truncate w-[95%]'>
                                                {index + 1}. {con?.title}
                                            </h3>
                                            <div className='flex gap-2 text-sm'>
                                                {con?.type === ContentType.VIDEO ? <TvMinimalPlayIcon className='size-4' /> : <FileIcon className='size-4' />}
                                                {formatDuration(con?.VideoMetadata?.duration || 0)}
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