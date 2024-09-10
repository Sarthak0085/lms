import { getQuestionsByContentId } from "@/actions/questions/get-questions"
import { ExtendQuestion } from "@/types"
import { Avatar, AvatarFallback, AvatarImage, Button, Textarea, toast } from "@repo/ui"
import { cn } from "@repo/ui/lib/utils"
import { User } from "next-auth"
import { useEffect, useRef, useState } from "react";
import { QuestionCard } from "./question-card"
import { FaUser, ReloadIcon } from "@repo/ui/icon"
import { Editor } from "../editor"

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [questionsData, setQuestionsData] = useState<ExtendQuestion[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const fetchData = async () => {
        const questions = await getQuestionsByContentId(contentId);
        if (!questions.error) {
            setQuestionsData(questions?.data);
        }
    }

    const handleRefetch = () => { fetchData(); }

    const handleQuestionSubmit = async () => {
        console.log("clicked");
        if (question === "") {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Answer cannot be empty."
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/questions`, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,
                    ...(isEdit && { questionId: questionId })
                }),
            });

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: isEdit ? "Error while updating the Question" : "Error while creating the Question",
                });
            } else {
                toast({
                    variant: "success",
                    title: "Success!!",
                    description: isEdit ? "Question updated successfully" : "Question added successfully",
                });
                setQuestion("");
                setIsEdit(false);
                handleRefetch();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: isEdit ? "Error while updating the Question" : "Error while creating the Question",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // const handleQuestionSubmit = async () => {
    //     console.log("clicked")
    //     if (question === "") {
    //         toast({
    //             variant: "destructive",
    //             title: "Uh oh! Something went wrong.",
    //             description: "Question cannot be empty."
    //         });
    //     } else if (isEdit === true) {
    //         try {
    //             const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/questions`, {
    //                 method: "PUT",
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     question: question,
    //                     questionId: questionId
    //                 }),
    //             });
    //             if (!response.ok) {
    //                 toast({
    //                     variant: "destructive",
    //                     title: "Uh oh! Something went wrong.",
    //                     description: "Error while updating the Question",
    //                 })
    //             }
    //             else {
    //                 toast({
    //                     variant: "success",
    //                     title: "Success!!",
    //                     description: "Question updated successfully",
    //                 });
    //                 setQuestion("");
    //                 handleRefetch();
    //             }
    //         } catch (error) {
    //             toast({
    //                 variant: "destructive",
    //                 title: "Uh oh! Something went wrong.",
    //                 description: "Error while updating the Question",
    //             })
    //         }
    //     } else {
    //         try {
    //             const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/questions`, {
    //                 method: "POST",
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     question: question,
    //                 }),
    //             });
    //             if (!response.ok) {
    //                 toast({
    //                     variant: "destructive",
    //                     title: "Uh oh! Something went wrong.",
    //                     description: "Error while creating the Question",
    //                 })
    //             }
    //             else {
    //                 toast({
    //                     variant: "success",
    //                     title: "Success!!",
    //                     description: "Question added successfully",
    //                 });
    //                 setQuestion("");
    //                 handleRefetch();
    //             }
    //         } catch (error) {
    //             toast({
    //                 variant: "destructive",
    //                 title: "Uh oh! Something went wrong.",
    //                 description: "Error while creating the Question",
    //             })
    //         }
    //     }
    // }

    const deleteQuestion = async (questionId: string) => {
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
            <div className='flex my-3 gap-2 mb-10 w-full'>
                <Avatar
                    className={
                        "w-[40px] h-[40px] ml-6 cursor-pointer rounded-full"}
                >
                    <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                    <AvatarFallback className="bg-black/80">
                        <FaUser color="white" />
                    </AvatarFallback>
                </Avatar>
                <div className="w-full space-y-3 flex flex-col">
                    <div className="w-full">
                        <Editor
                            //@ts-ignore
                            ref={textareaRef}
                            placeholder="Write your question...."
                            value={question}
                            onChange={(value: string) => setQuestion(value)}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <Button
                            variant={"primary"}
                            disabled={isSubmitting}
                            onClick={() => handleQuestionSubmit()}
                        >
                            {
                                isSubmitting &&
                                <ReloadIcon
                                    className="size-4 animate-spin me-2"
                                />
                            }
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <br />
            <div className='w-full my-3'>
                {
                    questionsData?.map((question: ExtendQuestion, index: number) => (
                        <div key={question?.id || index} className='my-4'>
                            <QuestionCard
                                question={question}
                                handleEdit={handleEdit}
                                handleRefetch={handleRefetch}
                                deleteQuestion={deleteQuestion}
                                courseId={courseId}
                                contentId={contentId}
                                user={user}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}