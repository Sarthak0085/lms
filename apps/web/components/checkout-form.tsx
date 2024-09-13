import { Course } from "@repo/db/types";
import { Button, toast } from "@repo/ui";
import { ReloadIcon } from "@repo/ui/icon";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface CheckoutFormProps {
    stripePromise: string;
    data: Course;
    amount: number;
    estimatedPrice?: number | null;
}

export const CheckoutForm = ({ stripePromise, data, amount, estimatedPrice }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const createOrder = async ({
        courseId,
        payment_info,
        price,
        estimatedPrice
    }: {
        courseId: string,
        payment_info: PaymentIntent,
        price: number,
        estimatedPrice?: number | null
    }) => {
        fetch("/api/create-order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseId: courseId,
                payment_info: payment_info,
                price: price,
                estimatedPrice: estimatedPrice,
            })
        }).then((res) => res.json())
            .then((data) => {
                toast({
                    variant: "success",
                    title: "Success!!",
                    description: data?.success
                });
                redirect(`/course/${courseId}/sections`);
            }
            )
            .catch((error) => {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "uh oh! Something went wrong!",
                    description: error,
                });
            });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret,
            redirect: "if_required"
        });

        if (error?.type === "card_error" || error?.type === "validation_error") {
            setMessage(error?.message as string);
        } else {
            setMessage("An unexpected error occurred.");
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false);
            createOrder({ courseId: data?.id, payment_info: paymentIntent, price: amount, estimatedPrice: estimatedPrice });
        }
    }

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount
            }),
        }).then((res) => res.json())
            .then((data) => setClientSecret(data?.clientSecret))
            .catch((error) => console.log(error))
    }, [amount]);


    if (!stripe || !elements || !clientSecret) {
        return (
            <div className="flex items-center justify-center">
                <ReloadIcon className="size-16" />
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            <Button
                type="submit"
                variant={"primary"}
                disabled={!stripe || !elements || isLoading}
            >
                {isLoading ?
                    <>
                        <ReloadIcon
                            className="size-4 animate-spin me-2"
                        />
                        Paying...
                    </>
                    : `Pay ₹.${amount}`
                }
            </Button>
            {message &&
                <div id='payment-message' className='text-[red] font-Poppins pt-2'>{message}</div>
            }
        </form>
    )
}