import { ExtendCourse, ExtendReview } from "@/types"
import { Ratings } from "../ratings"
import { formatDate } from "@/lib/utils";

interface ReviewsProps {
    course?: ExtendCourse | null;
}

export const Reviews = ({ course }: ReviewsProps) => {
    return (
        <div className="w-full">
            <div className="825:flex items-center">
                <Ratings rating={course?.ratings!} />
                <div className="mb-2 825:mb-[unset]">
                    <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                        {Number.isInteger(course?.ratings)
                            ? course?.ratings.toFixed(1)
                            : course?.ratings.toFixed(2)}{" "}
                        Course Rating * {course?.reviews?.length} Reviews
                    </h5>
                </div>
                <br />
                {(course?.reviews && [...course.reviews].reverse())?.map(
                    (item: ExtendReview, index: number) => (
                        <div className="w-full pb-4" key={index}>
                            <div className="flex">
                                <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                                    <h1 className="uppercase text-black dark:text-white text-[18px]">
                                        {item?.user?.name?.slice(0, 2)}
                                    </h1>
                                </div>
                                <div className="hidden 825:block pl-2">
                                    <div className="flex items-center">
                                        <h5 className="uppercase text-black dark:text-white text-[18px]">
                                            {item?.user?.name}
                                        </h5>
                                        <Ratings rating={item.rating} />
                                    </div>
                                    <p className="text-black dark:text-white">
                                        {item?.content}
                                    </p>
                                    <small className="dark:text-[#ffffffe2] text-[#0000000e]">
                                        {formatDate(item?.createdAt)} •
                                    </small>
                                </div>
                                <div className="pl-2 825:hidden flex items-center">
                                    <h5 className="uppercase text-black dark:text-white text-[18px]">
                                        {item?.user?.name}
                                    </h5>
                                    <Ratings rating={item.rating} />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}