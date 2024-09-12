import MuxPlayer from '@mux/mux-player-react';
import { Content, VideoMetadata } from '@repo/db/types';
import { Button } from '@repo/ui';
import { ChevronLeftIcon, ChevronRightIcon, CirclePlayIcon } from '@repo/ui/icon';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
    courseId: string;
    contentId?: string;
    playbackUrl?: string;
    videoMetadata?: VideoMetadata | null;
    nextSection?: Content | null;
    prevSection?: Content | null;
    playbackUrl2?: string | null;
}

export const VideoPlayer = ({ courseId, contentId, playbackUrl, videoMetadata, nextSection, prevSection, playbackUrl2 }: VideoPlayerProps) => {
    const router = useRouter();
    const [videoProgress, setVideoProgress] = useState(0);
    const [isVideoEnd, setIsVideoEnd] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/video-progress`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data?.currentTimestamp !== videoProgress) {
                    setVideoProgress(data?.currentTimestamp || 0);
                }
                console.log('Fetched progress:', data, videoProgress);
                setIsVideoEnd(data?.currentTimestamp >= (videoMetadata?.duration!));
            } catch (error) {
                console.error('Failed to fetch video progress:', error);
            }
        };

        fetchProgress();
    }, [contentId, courseId])

    useEffect(() => {
        const video = videoRef?.current;
        if (video) {
            const handledEnded = () => {
                if (isVideoEnd || video.currentTime >= videoMetadata?.duration!) {
                    setIsVideoEnd(true);
                    setVideoProgress(0);

                    fetch(`/api/courses/${courseId}/sections/${contentId}/markAsCompleted`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(() => {
                        console.log('Video mark as completed.');
                    }).catch((error) => {
                        console.error('Failed to update video progress:', error);
                    });
                }
            }

            video.addEventListener('ended', handledEnded);

            return () => {
                video.removeEventListener('ended', handledEnded);
            }
        }
    }, [isVideoEnd, courseId, contentId, videoMetadata?.duration])

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.currentTime = videoProgress;
            const handleTimeUpdate = () => {
                fetch(`/api/courses/${courseId}/sections/${contentId}/video-progress`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        currentTimestamp: video.currentTime,
                    })
                }).then(() => {
                    console.log('Video progress updated.');
                }).catch((error) => {
                    console.error('Failed to update video progress:', error);
                });
            };

            video.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [videoProgress, contentId, courseId]);

    return (
        <div className='relative w-full mb-3 !h-[400px]'>
            {playbackUrl && <MuxPlayer
                //@ts-ignore
                ref={videoRef}
                playbackId={playbackUrl}
                className='w-full h-[400px]'
            />}
            {!playbackUrl && playbackUrl2 &&
                <video autoPlay ref={videoRef} className='w-full h-[400px]'>
                    <source src={playbackUrl2} />
                </video>}
            {isVideoEnd && nextSection &&
                <div className='absolute top-0 left-0  w-full h-[400px] backdrop-blur-md'>
                    <div className='flex flex-col items-center justify-center space-y-2 h-full'>
                        <span className='text-muted-foreground'>Next Section</span>
                        <h2 className='font-semibold text-[24px]'>{nextSection?.title}</h2>
                        <Button
                            variant='icon'
                            onClick={() => router.push(`/course/${courseId}/sections/${nextSection?.id}`)}
                        >
                            <CirclePlayIcon className='size-16 hover:text-blue-400 hover:scale-105' />
                            <span className='sr-only'>Next Section Play Button</span>
                        </Button>
                        <Button
                            variant='ghost'
                            className='text-[16px] hover:bg-transparent hover:underline'
                            onClick={() => setIsVideoEnd(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            }
            <Button
                variant={"primary"}
                disabled={prevSection === null}
                className={`absolute left-2 top-[180px] !rounded-full !w-[40px] !p-0 !h-[40px] ${prevSection === null && "cursor-no-drop opacity-[0.8]"}`}
                onClick={() => router.push(`/course/${courseId}/sections/${prevSection?.id}`)}
            >
                <ChevronLeftIcon className='size-5 font-bold' />
                <span className='sr-only'>Prev Lesson</span>
            </Button>
            <Button
                variant={"primary"}
                disabled={nextSection === null}
                className={`absolute right-2 top-[180px] !rounded-full !w-[40px] !p-0 !h-[40px] ${nextSection === null && "cursor-no-drop opacity-[0.8]"}`}
                onClick={() => router.push(`/course/${courseId}/sections/${nextSection?.id}`)}
            >
                <ChevronRightIcon className='size-5 font-bold' />
                <span className='sr-only'>Next Lesson</span>
            </Button>
        </div>
    );
};
