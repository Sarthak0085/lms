import { formatDate } from "@/lib/utils";
import { ExtendQuestion } from "@/types";
import { VoteType } from "@repo/db/types";
import { Avatar, AvatarFallback, AvatarImage, Button, toast } from "@repo/ui";
import { AiOutlineDelete, BiPencil, LiaComments, PiArrowFatLinesDown, PiArrowFatLinesDownFill, PiArrowFatLinesUp, PiArrowFatLinesUpFill } from "@repo/ui/icon";
import { User } from "next-auth";
import { useRef, useState } from "react";
import { AnswerCard } from "./answers";
import { AnswerForm } from "./answer-form";
import { ReadText } from "../read-text";

interface QuestionCardProps {
    question: ExtendQuestion;
    user: User;
    courseId: string;
    contentId: string;
    handleRefetch: () => void;
    handleEdit: (questionId: string, question: string) => void;
    deleteQuestion: (questionId: string) => void;
}

export const QuestionCard = ({
    question,
    user,
    courseId,
    contentId,
    handleRefetch,
    handleEdit,
    deleteQuestion
}: QuestionCardProps) => {
    const [answer, setAnswer] = useState("");
    const [answerId, setAnswerId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const answerRef = useRef<HTMLTextAreaElement>()
    const [open, setOpen] = useState<{ [key: string]: boolean }>({
        [question?.id]: false,
    });
    const [upvotes, setUpvotes] = useState<{
        isUpvote?: boolean;
        count: number;
    }>({
        isUpvote: question?.votes?.some(vote => vote?.userId === user?.id && vote.voteType === VoteType.UPVOTE),
        count: question?.upvotes,
    });

    const [downvotes, setDownvotes] = useState<{
        isDownvote?: boolean;
        count: number;
    }>({
        isDownvote: question?.votes?.some(vote => vote?.userId === user?.id && vote.voteType === VoteType.DOWNVOTE),
        count: question?.downvotes,
    });

    const handleVote = async (type: 'up' | 'down', questionId: string) => {
        const isUpvote = type === 'up';
        const beforeUpdate = isUpvote ? { ...upvotes } : { ...downvotes };
        if (type === "up") {
            setUpvotes(prev => ({
                isUpvote: !prev.isUpvote,
                count: prev?.isUpvote === true ? prev.count - 1 : prev.count + 1,
            }));
        }
        if (type === "down") {
            setDownvotes(prev => ({
                isDownvote: !prev.isDownvote,
                count: prev?.isDownvote === true ? prev.count - 1 : prev.count + 1,
            }));
        }
        try {
            const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/votes`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: questionId,
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
                    setUpvotes(beforeUpdate!);
                } else {
                    setDownvotes(beforeUpdate!);
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
                setUpvotes(beforeUpdate!);
            } else {
                setDownvotes(beforeUpdate!);
            }
        }
    }

    const handleAnswerEdit = (answer: string, answerId: string) => {
        setAnswer(answer);
        setAnswerId(answerId);
        setIsEdit(true)
        if (answerRef?.current) {
            answerRef?.current?.focus();
        }
    }

    return (
        <>
            <div className="mb-4">
                <div className="w-full h-[90px] hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-between">
                    <div className="pl-3">
                        <div className="flex items-center gap-2 ">
                            <Avatar
                                className={"w-[50px] h-[50px] -mt-6 cursor-pointer rounded-full"}
                            >
                                <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                                <AvatarFallback className="bg-slate-600/90">
                                    <h1 className="uppercase text-black dark:text-white text-[18px]">
                                        {question?.author?.name?.slice(0, 2)}
                                    </h1>
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <h5 className="uppercase font-semibold text-black dark:text-white text-[18px]">
                                    {question?.author?.name}
                                </h5>
                                <p className="text-black cursor-pointer dark:text-white !py-0"
                                    onClick={() => setOpen(prev => ({ [question?.id]: !prev[question?.id] }))}
                                >
                                    <ReadText value={question?.content} />
                                </p>
                                <small className="dark:text-[#ffffffe2] text-muted-foreground">
                                    {!question?.createdAt ? "" : (formatDate(question?.createdAt))} •
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pr-2 items-center justify-end">
                        {user?.id !== question?.authorId ? <>
                            <Button
                                variant={"icon"}
                                className="!p-0 !h-auto"
                                onClick={() => handleVote("up", question?.id)}
                            >
                                {!downvotes?.isDownvote &&
                                    <>
                                        {upvotes?.count}
                                        {upvotes?.isUpvote ? <PiArrowFatLinesUpFill className="size-5 ms-2 text-blue-600" /> : <PiArrowFatLinesUp className="size-5 ms-2  text-blue-600" />}
                                    </>
                                }
                                <span className="sr-only">Vote Up</span>
                            </Button>
                            <Button
                                variant={"icon"}
                                className="!p-0 !h-auto"
                                onClick={() => handleVote("down", question?.id)}
                            >
                                {!upvotes.isUpvote &&
                                    <>
                                        {downvotes?.count}
                                        {downvotes?.isDownvote ? <PiArrowFatLinesDownFill fill="blue" className="size-5 ms-2 text-blue-600" /> : <PiArrowFatLinesDown fill="blue" className="size-5 ms-2 text-blue-600" />}
                                    </>
                                }
                                <span className="sr-only">Vote Down</span>
                            </Button>
                        </> :
                            <>
                                <Button
                                    variant={"icon"}
                                    className="!p-0 !h-auto"
                                    onClick={() => handleEdit(question?.content, question?.id)}
                                >
                                    <BiPencil className="size-5 ms-2  text-blue-600" />
                                    <span className="sr-only">Edit Question</span>
                                </Button>
                                <Button
                                    variant={"icon"}
                                    className="!p-0 !h-auto"
                                    onClick={() => deleteQuestion(question?.id)}
                                >
                                    <AiOutlineDelete className="size-5 ms-2 text-red-600" />
                                    <span className="sr-only">Delete Question</span>
                                </Button>
                            </>
                        }
                        <Button
                            variant={"icon"}
                            className="!p-0 !h-auto"
                            onClick={() => setOpen(prev => ({ [question?.id]: !prev[question?.id] }))}
                        >
                            {question?.totalanswers} <LiaComments className="size-5 ms-2" />
                        </Button>
                    </div>
                </div>
            </div>
            {
                open[question?.id] &&
                <>
                    {question?.totalanswers > 0 &&
                        question?.answers?.map((answer, index) => (
                            <AnswerCard
                                key={answer?.id || index}
                                answer={answer}
                                courseId={courseId}
                                contentId={contentId}
                                handleRefetch={handleRefetch}
                                user={user}
                                handleEdit={handleAnswerEdit}
                            />
                        ))}
                    <AnswerForm
                        answer={answer}
                        questionId={question?.id}
                        answerId={answerId}
                        answerRef={answerRef as any}
                        setAnswer={setAnswer}
                        isEdit={isEdit}
                        user={user}
                        courseId={courseId}
                        contentId={contentId}
                        setIsEdit={setIsEdit}
                        handleRefetch={handleRefetch}
                    />
                </>
            }
        </>
    )
}