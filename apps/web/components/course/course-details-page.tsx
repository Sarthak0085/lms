"use client";

import React, { useEffect, useState } from "react";
// import CourseDetails from "./CourseDetails";
import { loadStripe } from "@stripe/stripe-js";
import { Header } from "../header";
import { Footer } from "../footer";

interface CourseDetailsPageProps {
    id: string;
}

export const CourseDetailsPage = ({ id }: CourseDetailsPageProps) => {
    // const { data, isLoading } = useGetCourseDetailsQuery(id, {});
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    // const { data: config } = useGetStripePublishableKeyQuery({});
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState("");
    // const [createPaymentIntent, { data: paymentIntentData }] =
    //     useCreatePaymentIntentMutation();

    // useEffect(() => {
    //     if (config) {
    //         const publishableKey = config?.publishableKey;
    //         setStripePromise(loadStripe(publishableKey));
    //     }

    //     if (data) {
    //         const amount = Math.round(data?.course?.price * 100);
    //         createPaymentIntent(amount);
    //     }
    // }, [config, data]);

    // useEffect(() => {
    //     if (paymentIntentData) {
    //         setClientSecret(paymentIntentData?.client_secret);
    //     }
    // }, [paymentIntentData]);

    return (
        <div>
            <Header />
            {/* {stripePromise && (
                <CourseDetails
                    data={data?.course}
                    stripePromise={stripePromise}
                    clientSecret={clientSecret}
                    setOpen={setOpen}
                    setRoute={setRoute}
                />
            )} */}
            <Footer />
        </div>
    );
};