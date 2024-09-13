import { createReview } from "@/actions/review";
import { createReviewSchema } from "@/schemas";
import { ExtendCourse } from "@/types"
import { Avatar, AvatarFallback, AvatarImage, Button, Textarea, toast } from "@repo/ui"
import { AiFillStar, AiOutlineStar, ReloadIcon } from "@repo/ui/icon"
import { User } from "next-auth";
import { useState, useTransition } from "react"
import { z } from "zod";

interface CreateReviewProps {
    course: ExtendCourse;
    user: User;
}

export const CreateReview = ({ user, course }: CreateReviewProps) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [isPending, startTransition] = useTransition();

    const isReviewExists = course?.reviews?.findIndex((review) => review?.userId === user?.id);

    const handleSubmit = async () => {
        const values = { courseId: course?.id, rating: rating, content: review } as z.infer<typeof createReviewSchema>;
        startTransition(() => {
            createReview(values)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: data?.error
                        })
                    }
                    if (data?.success) {
                        toast({
                            variant: "success",
                            title: "Success!!",
                            description: data?.error
                        })
                    }
                }).catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There is something wrong happens while creating an review"
                    })
                })
        })
    }

    return (
        <div className='w-full'>
            {
                !isReviewExists && (
                    <div className='w-full flex '>
                        <Avatar
                            className={"w-[50px] h-[50px] -mt-6 cursor-pointer rounded-full"}
                        >
                            <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                            <AvatarFallback className="bg-slate-600/90">
                                <h1 className="uppercase text-black dark:text-white text-[18px]">
                                    {user?.name?.slice(0, 2)}
                                </h1>
                            </AvatarFallback>
                        </Avatar>
                        <div className='w-full'>
                            <h5 className='pl-3 text-[20px] text-black dark:text-white'>
                                Give a Rating <span className='text-red-500'>*</span>
                            </h5>
                            <div className='flex w-full mr-2 pb-3'>
                                {[1, 2, 3, 4, 5].map((i) =>
                                    rating >= i ?
                                        (<AiFillStar key={i} className="mr-2 cursor-pointer" size={25} color="rgb(246,186,0)" onClick={() => setRating(i)} />) :
                                        (<AiOutlineStar key={i} className="mr-2 cursor-pointer" size={25} color="rgb(246,186,0)" onClick={() => setRating(i)} />)
                                )}
                            </div>
                            <Textarea
                                rows={5}
                                cols={40}
                                placeholder="Write your Review...."
                                className={`outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins`}
                                value={review}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
                            />
                            <div className='w-full flex justify-end'>
                                <Button
                                    variant={"primary"}
                                    className={`!w-[120px] !h-[40px] !text-[18px] mt-5`}
                                    disabled={isPending}
                                    onClick={() => handleSubmit()}
                                >
                                    {isPending &&
                                        <ReloadIcon className="me-2 animate-spin" />
                                    }
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}