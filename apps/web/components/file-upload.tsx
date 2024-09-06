//@ts-nocheck
'use client';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button, toast } from '@repo/ui';
import { TrashIcon } from '@repo/ui/icon';
import { UploadDropzone } from '@uploadthing/react';
import Image from 'next/image';
import { UploadedFileData, UploadFileResult } from 'uploadthing/types';

interface ImageUploadProps {
    onChange?: any;
    onRemove: (value: any[]) => void;
    value: any[];
    maxSize?: number;
    isVideo?: boolean;
}

export default function FileUpload({
    onChange,
    onRemove,
    value,
    maxSize,
    isVideo = false
}: ImageUploadProps) {
    const onDeleteFile = (key: string) => {
        const files = value;
        let filteredFiles = files.filter((item) => item.key !== key);
        onRemove(filteredFiles);
    };

    const onUpdateFile = (newFiles: any[]) => {
        onChange([...value, ...newFiles]);
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {!!value.length &&
                    value?.map((item) => (
                        <div
                            key={item.key}
                            className="relative h-auto w-full overflow-hidden rounded-md"
                        >
                            <div className="absolute right-2 top-2 z-10">
                                <Button
                                    type="button"
                                    onClick={() => onDeleteFile(item.key)}
                                    variant="destructive"
                                    size="sm"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <div>
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Image"
                                    src={item.url || ''}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <div>
                {value.length < (maxSize ?? 4) && (
                    <UploadDropzone
                        endpoint={isVideo ? "videoUploader" : "imageUploader"}
                        config={{ mode: 'auto' }}
                        content={{
                            allowedContent({ isUploading }: { isUploading: boolean }) {
                                if (isUploading)
                                    return (
                                        <>
                                            <p className="mt-2 animate-pulse text-sm text-slate-400">
                                                {isVideo ? "Video" : "Img"} Uploading...
                                            </p>
                                        </>
                                    );
                            }
                        }}
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            const data: any[] | undefined = res;
                            if (data) {
                                onUpdateFile(data);
                            }
                        }}
                        onUploadError={(error: Error) => {
                            toast({
                                title: 'Error',
                                variant: 'destructive',
                                description: error.message
                            });
                        }}
                        onUploadBegin={() => {
                            // Do something once upload begins
                        }}
                        className="ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 py-2 dark:bg-zinc-800"
                    />
                )}
            </div>
        </div>
    );
}