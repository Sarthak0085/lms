"use client"

import {
    AiFillStar,
    AiOutlineStar,
    BsStarHalf
} from '@repo/ui/icon';
import React from 'react'

interface RatingsProps {
    rating: number;
}

export const Ratings = ({ rating }: RatingsProps) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <AiFillStar
                    key={i}
                    size={20}
                    className="mr-2 cursor-pointer text-[#f6b100]"
                />
            );
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(
                <BsStarHalf
                    key={i}
                    size={17}
                    className="mr-2 cursor-pointer text-[#f6b100]"
                />
            );
        } else {
            stars.push(
                <AiOutlineStar
                    key={i}
                    size={20}
                    className="mr-2 cursor-pointer text-[#f6b100]"
                />
            );
        }
    }
    return (
        <div className='flex mt-1 ml-2 825:mt-0 825:ml-0'>{stars}</div>
    )
}
