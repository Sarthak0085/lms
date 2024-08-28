
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
    return (
        <footer>
            <div className='border border-[#0000000e] dark:border-[#ffffff1e]'>
                <br />
                <div className='w-[85%] 825:max-w-[95%] mx-auto px-2 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
                        <div className='space-y-3 825:text-left text-center'>
                            <h3 className='text-[20px] text-black font-[600] dark:text-white'>About</h3>
                            <ul className='space-y-4'>
                                <li>
                                    <Link
                                        href="/about"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'
                                    >
                                        Our Story
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/faq"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='space-y-3 825:text-left text-center'>
                            <h3 className='text-[20px] text-black font-[600] dark:text-white'>Quick Links</h3>
                            <ul className='space-y-4'>
                                <li>
                                    <Link
                                        href="/courses"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/profile"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'>
                                        My Account
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/course-dashboard"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'
                                    >
                                        Courses Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='space-y-3 825:text-left text-center'>
                            <h3 className='text-[20px] text-black font-[600] dark:text-white'>Social Links</h3>
                            <ul className='space-y-4'>
                                <li>
                                    <Link
                                        href="https://www.youtube.com"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'
                                    >
                                        Youtube
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/profile"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'
                                    >
                                        My Account
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/course-dashboard"
                                        className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'
                                    >
                                        Courses Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='text-center 825:text-left'>
                            <h3 className='text-[20px] text-black font-[600] dark:text-white pb-2'>Contact Info</h3>

                            <p className='text-base text-black dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a] pb-2'>
                                <a href='tel:1882322888' target='_blank'>Call Us: 1-882-322-444</a>
                            </p>
                            <p className=' text-black dark:text-white pb-2'>
                                Address: +7011 vermont Ave, Los Angles
                            </p>
                            <p className=' text-black pb-2 dark:text-white hover:text-blue-500 dark:hover:text-[#37a39a]'>
                                <a href='mailto:sarth.mahajan2000@gmail.com' target='_blank'>
                                    Mail Us: sarth.mahajan2000@gmail.com
                                </a>
                            </p>

                        </div>
                    </div>
                    <br />
                    <p className='text-center text-base text-black dark:text-white'>
                        Copyright &copy; {new Date().getFullYear()} E-Learning | All Rights Reserved
                    </p>
                    <br />
                </div>
            </div>
        </footer>
    )
};
