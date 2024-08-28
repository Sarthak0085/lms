import { Search } from "@repo/ui/icon";
import Image from "next/image";
import Link from "next/link";

const data = {
    title: "Improve Your Online Learning Experience Better Instantly",
    subTitle: "We have 20K+ Online Courses & 100k+ Online registered students.Find your desired courses from them.",
}

export const Hero = () => {
    return (
        <div className='w-full lg:max-h-[80vh] flex flex-col lg:flex-row items-center space-y-20 mb-20'>
            <div className='lg:!w-[45%] lg:my-auto flex items-center justify-center mt-[50px] 825:w-[85%] w-full lg:top-[unset] 1500:h-[700px] 1500:w-[700px] 1100:h-[600px] 1100:w-[600px]'>
                <div className='lg:w-[90%] flex items-center justify-center lg:pt-0 z-10 hero_animation rounded-md mx-2'>
                    <Image
                        src={"/hero.png"}
                        width={400}
                        height={400}
                        alt="Banner Image"
                        className='object-cover dark:bg-transparent w-full rounded-full 1500:max-w-[85%]'
                    />
                </div>
            </div>
            <div className='w-full lg:w-[55%] flex flex-col px-10 lg:px-0 !text-center lg:!text-left lg:mt-[80px]'>
                <h2 className='dark:text-white text-[#000000c9] text-[30px] w-full lg:text-[70px] font-[700] font-Josefin  lg:leading-[75px] 1500:leading-[95px] '>
                    {data?.title}
                </h2>
                <br />
                <p className='dark:text-[#ffffffe1] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500:!w-[55%] 1100:w-[78%]'>
                    {data?.subTitle}
                </p>
                <br />
                <div className='1500:w-[55%] 1100:w-[78%] w-[90%] h-[50px] bg-transparent relative'>
                    <input
                        type='search'
                        placeholder='Search Courses....'
                        className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] h-full w-full p-2 outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-Josefin font-[500]'
                    />
                    <div className='absolute flex items-center justify-center w-[50px] h-[50px] cursor-pointer right-0 top-0 rounded-r-[5px] bg-blue-500'>
                        <Search
                            className="dark:text-white text-black"
                            size={30}
                        />
                    </div>
                </div>
                <br />
                <div className='1500:w-[55%] 1100:w-[78%] w-[90%] flex items-center'>
                    <Image
                        src={"/image_urlgenerator_img1.png"}
                        width={50}
                        height={50}
                        alt="client"
                        className='w-[50px] h-[50px] shadow-md shadow-blue-200 rounded-full'
                    />
                    <Image
                        src={"/image_urlgenerator_img1.png"}
                        width={50}
                        height={50}
                        alt="client"
                        className='w-[50px] h-[50px] shadow-md shadow-blue-200 rounded-full ml-[-20px]'
                    />
                    <Image
                        src={"/image_urlgenerator_img1.png"}
                        width={50}
                        height={50}
                        alt="client"
                        className='w-[50px] h-[50px] shadow-md shadow-blue-200 rounded-full ml-[-20px]'
                    />
                    <p className='dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[17px] font-[600]'>
                        100k+ People already trusted us.
                        <Link href="/courses" className="text-blue-500 pl-2 dark:text-[#46e256]">
                            View Courses
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}