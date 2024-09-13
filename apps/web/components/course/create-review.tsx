import { Avatar, AvatarFallback, AvatarImage, Button } from "@repo/ui"
import { AiFillStar, AiOutlineStar } from "@repo/ui/icon"
import { useState } from "react"

export const CreateReview = ({ courseId, user }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    return (
        <div className='w-full'>
            {
                !isReviewedExist && (
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
                            <textarea
                                rows={5}
                                cols={40}
                                placeholder="Write your Review...."
                                className={`outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins`}
                                value={review}
                                onChange={(e: any) =>
                                    setReview(e.target.value)
                                }
                            />
                            <div className='w-full flex justify-end'>
                                <Button
                                    variant={"primary"}
                                    className={`!w-[120px] !h-[40px] !text-[18px] mt-5`}
                                    onClick={() => handleSubmit()}
                                >
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