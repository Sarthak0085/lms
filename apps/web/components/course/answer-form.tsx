import { Avatar, AvatarFallback, AvatarImage, Button, Textarea, toast } from "@repo/ui"
import { FaUser, ReloadIcon } from "@repo/ui/icon"
import { Editor } from "../editor";
import { User } from "next-auth";
import { useState } from "react";

interface AnswerFormProps {
    answer: string;
    answerId?: string;
    questionId: string;
    courseId: string;
    contentId: string;
    isEdit: boolean;
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
    handleRefetch: () => void;
    user: User
    answerRef: React.Ref<HTMLTextAreaElement>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AnswerForm = ({
    answer,
    answerId,
    questionId,
    courseId,
    contentId,
    isEdit,
    setAnswer,
    handleRefetch,
    user,
    setIsEdit,
    answerRef
}: AnswerFormProps) => {
    const [visible, setVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleAnswerSubmit = async () => {
        if (answer === "") {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Answer cannot be empty."
            });
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/courses/${courseId}/sections/${contentId}/answers`, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answer: answer,
                    ...(isEdit ? { answerId: answerId } : { questionId: questionId })
                }),
            });

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: isEdit ? "Error while updating the Answer" : "Error while creating the Answer",
                });
            } else {
                toast({
                    variant: "success",
                    title: "Success!!",
                    description: isEdit ? "Answer updated successfully" : "Answer added successfully",
                });
                setAnswer("");
                setIsEdit(false);
                handleRefetch();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: isEdit ? "Error while updating the Answer" : "Error while creating the Answer",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAnswerChange = (value: string) => {
        setAnswer(value);
    }

    return (
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
                <div className="w-full" onFocus={() => setVisible(true)}>
                    <Editor
                        //@ts-ignore
                        ref={answerRef}
                        placeholder="Write your question...."
                        value={answer}
                        onChange={handleAnswerChange}
                    />
                </div>
                {visible && <div className='flex justify-end'>
                    <Button
                        variant={"primary"}
                        disabled={isSubmitting}
                        onClick={() => handleAnswerSubmit()}
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
                }
            </div>
        </div>
    )
}