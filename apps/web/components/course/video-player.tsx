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
}

export const VideoPlayer = ({ courseId, contentId, playbackUrl, videoMetadata, nextSection, prevSection }: VideoPlayerProps) => {
    const router = useRouter();
    const [videoProgress, setVideoProgress] = useState(0);
    const [isVideoEnd, setIsVideoEnd] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null); // If you need a ref to HTMLVideoElement

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
                console.log('Fetched progress:', data);
                setVideoProgress(data?.currentTimestamp!);
            } catch (error) {
                console.error('Failed to fetch video progress:', error);
            }
        };

        fetchProgress(); // Initial fetch
    }, [contentId])

    useEffect(() => {
        const video = videoRef?.current;
        if (video) {
            const handledEnded = () => {
                setIsVideoEnd(true);
            }

            video.addEventListener('ended', handledEnded);

            return () => {
                video.removeEventListener('ended', handledEnded);
            }
        }
    }, [])

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.currentTime = videoProgress;
            const isVideoEnd = video.currentTime >= Number(videoMetadata?.duration);
            setIsVideoEnd(isVideoEnd);

            const handleTimeUpdate = () => {
                fetch(`/api/courses/${courseId}/sections/${contentId}/video-progress`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        currentTimestamp: video.currentTime
                    })
                }).then(() => {
                    console.log('Video progress updated.');
                }).catch((error) => {
                    console.error('Failed to update video progress:', error);
                });

                console.log("Video", video.currentTime, videoMetadata?.duration);
                if (isVideoEnd) {
                    fetch(`/api/courses/${courseId}/sections/${contentId}/video-progress`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            currentTimestamp: 0
                        })
                    }).then(() => { console.log("Reset progress") }).catch(() => { console.error("Error while reset the progress") })
                    fetch(`/api/courses/${courseId}/sections/${contentId}/markAsCompleted`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(() => {
                        console.log('Video completion recorded.');
                        // if (nextSectionId !== undefined || nextSectionId !== "" || nextSectionId !== null) {
                        //     router.push(`/course/${courseId}/sections/${nextSectionId}`);
                        // }
                    }).catch((error) => {
                        console.error('Failed to record video completion:', error);
                    });
                }
            };

            // Assuming MuxPlayer emits 'timeupdate' events
            video.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [videoProgress, contentId, videoMetadata, nextSection]);

    console.log(videoProgress);


    return (
        <div className='relative w-full mb-3 !h-[400px]'>
            <MuxPlayer
                ref={videoRef}
                playbackId={playbackUrl}
                className='w-full h-[400px]'
            />
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
