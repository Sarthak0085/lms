//@ts-nocheck
'use client';

import { ourFileRouter, OurFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/utils/uploadthing';
import { Button, toast } from '@repo/ui';
import { CirclePlay, ImageIcon, ReloadIcon, TrashIcon } from '@repo/ui/icon';
import Image from 'next/image';
import "@uploadthing/react/styles.css";
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';

interface UploadProps {
    value: string;
    onChange: (url?: string) => void;
    onRemove?: (value: any[]) => void;
    maxSize?: number;
    isVideo?: boolean;
    endpoint?: keyof typeof ourFileRouter
}

export default function FileUpload({
    onChange,
    onRemove,
    value,
    maxSize,
    isVideo = false,
    endpoint
}: UploadProps) {
    const [data, setData] = useState();
    const onDeleteFile = (key: string) => {
        onChange("");
    };
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.length > 0 &&
                    <div
                        className="relative h-auto w-full overflow-hidden rounded-md"
                    >
                        <div className="absolute right-2 top-2 z-10">
                            <Button
                                type="button"
                                onClick={() => onDeleteFile(value)}
                                variant="destructive"
                                size="sm"
                            >
                                <TrashIcon className="h-5 w-5 text-white" />
                            </Button>
                        </div>
                        <div>
                            <Image
                                className="w-full h-auto object-cover"
                                alt="Image"
                                src={value || ''}
                                layout={"responsive"}
                                height={100}
                                width={100}
                            />
                        </div>
                    </div>
                    // ))
                }
            </div>
            <div>
                {value.length < 1 && (
                    <UploadDropzone<OurFileRouter>
                        endpoint={"imageUploader"}
                        config={{ mode: 'auto' }}
                        appearance={{
                            button:
                                "hidden ut-ready:block ut-uploading:block ut-uploading:cursor-not-allowed rounded-r-none bg-[blue]",
                            container: "w-full flex-col rounded-md border-black/80 py-8 dark:border-white/80",
                        }}
                        content={{
                            uploadIcon() {
                                return (
                                    <ImageIcon className='w-8 h-8 !text-orange-500 ' />
                                )
                            },
                            label({ isUploading }) {
                                if (isUploading) {
                                    return (
                                        <ReloadIcon
                                            className='h-5 w-5 animate-spin text-blue-500'
                                        />
                                    )
                                }
                                return (
                                    <p className="!w-full text-[16px]  dark:text-white text-black hover:text-blue-500">
                                        Drag and Drop or click to browse
                                    </p>
                                )
                            },
                            button({ ready, isUploading, uploadProgress }: { ready: boolean; isUploading: boolean }) {
                                if (isUploading || ready) {
                                    return (
                                        <p className={cn("mt-2 animate-pulse text-sm text-white ",
                                            ready && "bg-blue-600",
                                            isUploading && "bg-blue-400"
                                        )}>
                                            {ready && "Uploading..."}
                                            {isUploading && uploadProgress}
                                        </p>
                                    )
                                }
                                return null;
                            },
                            allowedContent({ isUploading }: { isUploading: boolean }) {
                                if (isUploading) {
                                    return (
                                        <>
                                            <p className="mt-2 animate-pulse text-sm text-blue-400">
                                                Image Uploading...
                                            </p>
                                        </>
                                    )
                                } else {
                                    return (
                                        <p className="text-sm text-slate-400">
                                            Images up to 4MB, max 1
                                        </p>
                                    )
                                }
                            }
                        }}
                        onClientUploadComplete={(res) => {
                            const data: string | undefined = res;
                            console.log(data, "data");
                            if (data) {
                                setData(data);
                                onChange(data?.[0]?.url);
                            }
                            toast({
                                variant: "success",
                                title: "Success!!",
                                description: "Image Uploaded successfully",
                            })
                        }}
                        onUploadError={(error: Error) => {
                            toast({
                                title: 'Error!!',
                                variant: 'destructive',
                                description: error.message
                            });
                        }}
                        onUploadBegin={() => {
                            // Do something once upload begins
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export const VideoFileUpload = ({
    onChange,
    value,
}: UploadProps) => {
    const [data, setData] = useState();
    const onDeleteFile = (key: string) => {
        onChange("");
    };
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.length > 0 &&
                    <div
                        className="relative h-auto w-full overflow-hidden rounded-md"
                    >
                        <div className="absolute right-2 top-2 z-10">
                            <Button
                                type="button"
                                onClick={() => onDeleteFile(value)}
                                variant="destructive"
                                size="sm"
                            >
                                <TrashIcon className="h-5 w-5 text-white" />
                            </Button>
                        </div>
                        <div>
                            <video className='w-full h-auto' controls autoPlay>
                                <source src={value} type={data?.[0]?.type} />
                            </video>
                        </div>
                    </div>
                }
            </div>
            <div>
                {value.length < 1 && (
                    <UploadDropzone<OurFileRouter>
                        endpoint={"videoUploader"}
                        config={{ mode: 'auto' }}
                        appearance={{
                            button:
                                "hidden ut-ready:block ut-uploading:block ut-uploading:cursor-not-allowed rounded-r-none bg-[blue]",
                            container: "w-full flex-col rounded-md border-black/80 py-8 dark:border-white/80",
                        }}
                        content={{
                            uploadIcon() {
                                return (
                                    <CirclePlay className='h-8 w-8 text-blue-500' />
                                )
                            },
                            label({ isUploading }) {
                                if (isUploading) {
                                    return (
                                        <ReloadIcon
                                            className='h-5 w-5 animate-spin text-blue-500'
                                        />
                                    )
                                }
                                return (
                                    <p className="!w-full text-[16px] dark:text-white text-black hover:text-blue-500">
                                        Drag and Drop or click to browse
                                    </p>
                                )
                            },
                            button({ ready, isUploading, uploadProgress }: { ready: boolean; isUploading: boolean }) {
                                if (isUploading || ready) {
                                    return (
                                        <p className={cn("mt-2 animate-pulse text-sm text-white ",
                                            ready && "bg-blue-600",
                                            isUploading && "bg-blue-400"
                                        )}>
                                            {ready && "Uploading..."}
                                            {isUploading && uploadProgress}
                                        </p>
                                    )
                                }
                                return null;
                            },
                            allowedContent({ isUploading }: { isUploading: boolean }) {
                                if (isUploading) {
                                    return (
                                        <>
                                            <p className="mt-2 animate-pulse text-sm text-blue-400">
                                                Video Uploading...
                                            </p>
                                        </>
                                    )
                                } else {
                                    return (
                                        <p className="text-sm text-slate-400">
                                            Video up to 16MB, max 1
                                        </p>
                                    )
                                }
                            }
                        }}
                        onClientUploadComplete={(res) => {
                            const data: string | undefined = res;
                            console.log(data, "data");
                            if (data) {
                                setData(data);
                                onChange(data?.[0]?.url);
                            }
                            toast({
                                variant: "success",
                                title: "Success!!",
                                description: "Video Uploaded successfully",
                            })
                        }}
                        onUploadError={(error: Error) => {
                            toast({
                                title: 'Error!!',
                                variant: 'destructive',
                                description: error.message
                            });
                        }}
                        onBeforeUploadBegin={(files) => {
                            if (Array.isArray(files) && files.length > 0) {
                                // Take the first file (assuming only one file is uploaded)
                                const file = files[0];

                                const renamedFile = new File([file], "Section-Video-" + file.name, { type: file.type });

                                return [renamedFile];
                            }

                            return [];
                        }}
                    />
                )}
            </div>
        </div>
    );
}