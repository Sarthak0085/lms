import { getQuestionsByContentId } from "@/actions/questions/get-questions"
import { formatDate } from "@/lib/utils"
import { ExtendQuestion } from "@/types"
import { Avatar, AvatarFallback, AvatarImage, Button, Textarea, toast } from "@repo/ui"
import { AiOutlineDelete, BiPencil, FaUser, LiaComments, PiArrowFatLinesDown, PiArrowFatLinesUp } from "@repo/ui/icon"
import { cn } from "@repo/ui/lib/utils"
import { User } from "next-auth"
import { useEffect, useRef, useState } from "react";

interface QnASectionProps {
    user: User;
    contentId: string;
    courseId: string;
}

export const QnASection = ({
    user,
    contentId,
    courseId
}: QnASectionProps) => {
    const [question, setQuestion] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [questionId, setQuestionId] = useState("");
    const [questionsData, setQuestionsData] = useState<ExtendQuestion[] | []>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const fetchData = async () => {
        const questions = await getQuestionsByContentId(contentId);
        if (!questions.error) {
            setQuestionsData(questions?.data);
        }
    }

    const handleRefetch = () => { fetchData(); }

    const handleQuestionSubmit = async () => {
        console.log("clicked")
        if (question === "") {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Question cannot be empty."
            });
        } else if (isEdit === true) {
            try {
                const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/questions`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        question: question,
                        questionId: questionId
                    }),
                });
                if (!response.ok) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "Error while updating the Question",
                    })
                }
                else {
                    toast({
                        variant: "success",
                        title: "Success!!",
                        description: "Question updated successfully",
                    });
                    setQuestion("");
                    handleRefetch();
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Error while updating the Question",
                })
            }
        } else {
            try {
                const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/questions`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        question: question,
                    }),
                });
                if (!response.ok) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "Error while creating the Question",
                    })
                }
                else {
                    toast({
                        variant: "success",
                        title: "Success!!",
                        description: "Question added successfully",
                    });
                    setQuestion("");
                    handleRefetch();
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Error while creating the Question",
                })
            }
        }
    }

    const deleteQuestion = async (questionId: string) => {
        console.log("clicked")
        try {
            const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/questions`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: questionId,
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
                    description: "Question deleted successfully",
                });
                setQuestion("");
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

    const handleEdit = (question: string, questionId: string) => {
        setQuestion(question);
        setQuestionId(questionId);
        setIsEdit(true);
        if (textareaRef?.current) {
            textareaRef?.current.focus();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className='flex my-3 w-full'>
                <Avatar
                    className={cn(
                        "w-[40px] h-[40px] ml-6 cursor-pointer rounded-full")}
                >
                    <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                    <AvatarFallback className="bg-black/80">
                        <FaUser color="white" />
                    </AvatarFallback>
                </Avatar>
                <Textarea
                    ref={textareaRef}
                    rows={10}
                    cols={40}
                    placeholder="Write your question...."
                    className={`outline-none !ring-0 bg-transparent ml-3 border border-[#ffffff57] 825:w-full rounded w-[90%] 825:text-[18px] font-Poppins`}
                    value={question}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setQuestion(e.target.value)
                    }
                />
                <div className='absolute right-16 bottom-0'>
                    <Button
                        variant={"primary"}
                        onClick={() => handleQuestionSubmit()}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <br />
            {/* <div className='w-full h-[1px] bg-[#ffffff3b]'></div> */}
            <div className='w-full my-3'>
                {
                    questionsData?.map((question: ExtendQuestion, index: number) => (
                        <div key={question?.id || index} className='my-4'>
                            <div className="flex mb-2">
                                <div className="w-full h-[90px] hover:bg-gray-200 flex items-center justify-between">
                                    <div className="pl-3">
                                        <div className="flex items-center gap-2 ">
                                            <Avatar
                                                className={cn(
                                                    "w-[50px] h-[50px] -mt-6 cursor-pointer rounded-full")}
                                            >
                                                <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                                                <AvatarFallback className="bg-slate-600/90">
                                                    <h1 className="uppercase text-black dark:text-white text-[18px]">
                                                        {question?.author?.name?.slice(0, 2)}
                                                    </h1>
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-1">
                                                <h5 className="uppercase font-semibold text-black dark:text-white text-[18px]">
                                                    {question?.author?.name}
                                                </h5>
                                                <p className="text-black dark:text-white">
                                                    {question?.content}
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
                                            >
                                                {question?.upvotes} <PiArrowFatLinesUp className="size-5 ms-2  text-blue-600" />
                                                <span className="sr-only">Vote Up</span>
                                            </Button>
                                            <Button
                                                variant={"icon"}
                                                className="!p-0 !h-auto"
                                            >
                                                {question?.downvotes} <PiArrowFatLinesDown className="size-5 ms-2 text-blue-600" />
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
                                        >
                                            {question?.totalanswers} <LiaComments className="size-5 ms-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        // <CommentItem key={index} index={index} data={data} item={item} activeVideo={activeVideo} answer={answer} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} />
                    ))
                }
            </div>
        </>
    )
}