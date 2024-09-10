import { formatDate } from "@/lib/utils"
import { ExtendAnswer } from "@/types"
import { VoteType } from "@repo/db/types";
import { Avatar, AvatarFallback, AvatarImage, Button, toast } from "@repo/ui"
import { AiOutlineDelete, BiPencil, PiArrowFatLinesDown, PiArrowFatLinesDownFill, PiArrowFatLinesUp, PiArrowFatLinesUpFill } from "@repo/ui/icon"
import { User } from "next-auth";
import { useState } from "react";
import { ReadText } from "../read-text";

interface AnswerCardProps {
    answer: ExtendAnswer;
    user: User;
    courseId: string;
    contentId: string;
    handleRefetch: () => void;
    handleEdit: (answer: string, answerId: string) => void;
}

export const AnswerCard = ({
    answer,
    user,
    courseId,
    contentId,
    handleRefetch,
    handleEdit
}: AnswerCardProps) => {
    const [upvotes, setUpvotes] = useState<{
        isUpvote?: boolean;
        count: number;
    }>({
        isUpvote: answer?.votes?.some(vote => vote?.userId === user?.id && vote.voteType === VoteType.UPVOTE),
        count: answer?.upvotes,
    });

    const [downvotes, setDownvotes] = useState<{
        isDownvote?: boolean;
        count: number;
    }>({
        isDownvote: answer?.votes?.some(vote => vote?.userId === user?.id && vote.voteType === VoteType.DOWNVOTE),
        count: answer?.downvotes,
    });

    const handleVote = async (type: string, answerId: string) => {
        const beforeUpdate = type === "up" ? upvotes : downvotes;
        if (type === "up") {
            setUpvotes(prev => ({
                isUpvote: !prev.isUpvote,
                count: prev?.isUpvote === true ? prev.count + 1 : prev.count - 1,
            }));
        }
        if (type === "down") {
            setDownvotes(prev => ({
                isDownvote: !prev.isDownvote,
                count: prev?.isDownvote === true ? prev.count + 1 : prev.count - 1,
            }));
        }
        try {
            const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/votes`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answerId: answerId,
                    voteType: type === "up" ? VoteType.UPVOTE : VoteType.DOWNVOTE,
                }),
            });
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Error while voting",
                });
                if (type === "up") {
                    setUpvotes(beforeUpdate);
                } else {
                    setDownvotes(beforeUpdate);
                }
            }
            else {
                toast({
                    variant: "success",
                    title: "Success!!",
                    description: "Voting done successfully",
                });
                handleRefetch();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Error while voting the Question",
            });
            if (type === "up") {
                setUpvotes(beforeUpdate);
            } else {
                setDownvotes(beforeUpdate);
            }
        }
    }

    const deleteAnswer = async (answerId: string) => {
        try {
            const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/answers`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answerId: answerId,
                }),
            });
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Error while deleting the Question",
                })
            }
            else {
                toast({
                    variant: "success",
                    title: "Success!!",
                    description: "Answer deleted successfully",
                });
                handleRefetch();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Error while deleting the Question",
            })
        }
    }

    return (
        <div className="ml-8">
            <div className="w-full my-4 min-h-[90px] flex items-center justify-between">
                <div className="pl-3">
                    <div className="flex items-center gap-2 ">
                        <Avatar
                            className={"w-[50px] h-[50px] -mt-6 cursor-pointer rounded-full"}
                        >
                            <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                            <AvatarFallback className="bg-slate-600/90">
                                <h1 className="uppercase text-black dark:text-white text-[18px]">
                                    {answer?.author?.name?.slice(0, 2)}
                                </h1>
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <h5 className="uppercase font-semibold text-black dark:text-white text-[18px]">
                                {answer?.author?.name}
                            </h5>
                            <p className="text-black dark:text-white !py-0">
                                <ReadText value={answer?.content} />
                            </p>
                            <small className="dark:text-[#ffffffe2] text-muted-foreground">
                                {!answer?.createdAt ? "" : (formatDate(answer?.createdAt))} •
                            </small>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 pr-2 items-center justify-end">
                    {answer?.id === answer?.authorId ? <>
                        <Button
                            variant={"icon"}
                            className="!p-0 !h-auto"
                            onClick={() => handleVote("up", answer?.id)}
                        >
                            {upvotes?.count} {upvotes?.isUpvote ? <PiArrowFatLinesUpFill className="size-5 ms-2 text-blue-600" /> : <PiArrowFatLinesUp className="size-5 ms-2  text-blue-600" />}
                            <span className="sr-only">Vote Up</span>
                        </Button>
                        <Button
                            variant={"icon"}
                            className="!p-0 !h-auto"
                            onClick={() => handleVote("down", answer?.id)}
                        >
                            {downvotes?.count} {downvotes?.isDownvote ? <PiArrowFatLinesDownFill fill="blue" className="size-5 ms-2 text-blue-600" /> : <PiArrowFatLinesDown fill="blue" className="size-5 ms-2 text-blue-600" />}
                            <span className="sr-only">Vote Down</span>
                        </Button>
                    </> :
                        <>
                            <Button
                                variant={"icon"}
                                className="!p-0 !h-auto"
                                onClick={() => handleEdit(answer?.content, answer?.id)}
                            >
                                <BiPencil className="size-5 ms-2  text-blue-600" />
                                <span className="sr-only">Edit Answer</span>
                            </Button>
                            <Button
                                variant={"icon"}
                                className="!p-0 !h-auto"
                                onClick={() => deleteAnswer(answer?.id)}
                            >
                                <AiOutlineDelete className="size-5 ms-2 text-red-600" />
                                <span className="sr-only">Delete Answer</span>
                            </Button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}