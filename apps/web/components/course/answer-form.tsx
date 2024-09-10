import { Avatar, AvatarFallback, AvatarImage, Button, Textarea, toast } from "@repo/ui"
import { FaUser } from "@repo/ui/icon"
import { Editor } from "../editor";
import { User } from "next-auth";

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
    answerRef
}: AnswerFormProps) => {
    const handleAnswerSubmit = async () => {
        console.log("clicked")
        if (answer === "") {
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
                        answer: answer,
                        answerId: answerId,
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
                    setAnswer("");
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
                        answer: answer,
                        questionId: questionId
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
                    setAnswer("");
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

    const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(e.target.value);
    }

    return (
        <div className='flex my-3 w-full'>
            <Avatar
                className={
                    "w-[40px] h-[40px] ml-6 cursor-pointer rounded-full"}
            >
                <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                <AvatarFallback className="bg-black/80">
                    <FaUser color="white" />
                </AvatarFallback>
            </Avatar>
            <Editor
                ref={answerRef}
                placeholder="Write your question...."
                // className={`outline-none !ring-0 bg-transparent ml-3 border border-[#ffffff57] 825:w-full rounded w-[90%] 825:text-[18px] font-Poppins`}
                value={answer}
                onChange={handleAnswerChange as any}
            />
            <div className='absolute right-16 bottom-0'>
                <Button
                    variant={"primary"}
                    onClick={() => handleAnswerSubmit()}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}