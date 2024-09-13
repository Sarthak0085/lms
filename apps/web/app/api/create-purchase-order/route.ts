import { currentUser } from "@/lib/auth";
import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET)

export const POST = async (req: NextRequest) => {
    try {
        const { courseId, payment_info, estimatedPrice, price } = await req.json();

        if (payment_info) {
            if ("id" in payment_info) {
                const paymentIntentId = payment_info?.id;
                const paymentIntent = await stripe.paymentIntents?.retrieve(
                    paymentIntentId
                );

                if (paymentIntent.status !== "succeeded") {
                    return NextResponse.json({ message: "Payment not authorize" }, { status: 400 });
                }
            }

        }

        const user = await currentUser();

        if (!user || !user?.id) {
            return NextResponse.json({ message: "Unauthorized. Please login to access this" }, { status: 401 });
        }

        const isCourseExist = await db.course.findUnique({
            where: {
                id: courseId
            }
        });

        if (!isCourseExist) {
            return NextResponse.json({ message: "Course doesn't exist or deleted by admin or instructor" }, { status: 40 });
        }

        const isPurchased = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user?.id,
                    courseId: courseId
                }
            }
        });

        if (isPurchased) {
            return NextResponse.json({ message: "You have already purchased this course" }, { status: 400 });
        }

        // const mailData = {
        //     order: {
        //         _id: course?._id.toString().slice(0, 6),
        //         name: course.name,
        //         price: course.price,
        //         date: new Date().toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" }),
        //     }
        // }

        // const html = await ejs.renderFile(path.join(__dirname, "../mails/questionReply.ejs"), { order: mailData });

        // try {
        //     if (user) {
        //         await sendEmail({
        //             email: user.email,
        //             subject: "Order Confirmation",
        //             template: "questionReply.ejs",
        //             data: mailData,
        //         });
        //     }
        // } catch (error: any) {
        //     return next(new ErrorHandler(error.message, 500));
        // }


        // await NotificationModel.create({
        //     user: user?._id,
        //     title: "New Order",
        //     message: `You have a new Order from ${course?.name}`
        // });

        const discount = ((estimatedPrice - price) / estimatedPrice) * 100;

        await db.purchase.create({
            data: {
                userId: user?.id,
                courseId: courseId,
                amount: estimatedPrice ?? price,
                discount: discount ?? 0,
                finalPrice: price
            }
        });

        await db.course.update({
            where: {
                id: courseId
            },
            data: {
                purchased: {
                    increment: 1
                }
            }
        })

        return {
            success: "Course Purchased Successfully"
        }
    } catch (error) {
        console.error("Internal Error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};