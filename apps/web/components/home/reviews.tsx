import React from 'react';
import Image from "next/image";
import { ReviewCard } from './review-card';

const reviews = [
    {
        name: "Bill Gates",
        avatar: "",
        profession: "Student LPU",
        ratings: 3.5,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, voluptatum necessitatibus. Harum magnam, necessitatibus repudiandae sapiente dolore dolorum eligendi tempore, perferendis mollitia animi quasi sint! Assumenda itaque tempora repellendus similique?"
    }
]

export const Reviews = () => {
    return (
        <div className='w-[90%] 825:w-[85%] m-auto'>
            <div className='w-full 825:flex items-center'>
                <div className='825:w-[50%] w-full'>
                    <Image src={'/image_urlgenerator_img1.png'} alt="business" width={500} height={1000} />
                </div>
                <div className='800px:w-[50%] w-full'>
                    <h3 className={`text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-4 825:!text-[40px]`}>
                        Our Students are <span className='text-gradient text-blue-500 dark:text-[#37a39a]'>Our Strength</span><br />
                        See what they say about us.
                    </h3>
                    <br />
                    <p className={`font-[16px] font-Poppins text-black dark:text-white`}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur earum quasi distinctio qui minima, iste quod praesentium, assumenda est eaque et vel dicta, incidunt sapiente voluptatibus iusto animi? Tenetur, culpa.
                    </p>
                </div>
            </div>
            <br />
            <br />
            < div className='grid grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px] '>
                {reviews && reviews.map((item: any, index: number) => (
                    <ReviewCard item={item} key={index} />
                ))}
            </div>
        </div>
    )
}
