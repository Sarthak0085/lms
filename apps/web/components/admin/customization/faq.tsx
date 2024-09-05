import { FAQ } from "@repo/db/types";
import { Accordion, AccordionItem, AccordionTrigger, Input } from "@repo/ui";
import { MouseEvent, useState } from "react";

export const Faqs = () => {

    const [faqs, setFaqs] = useState<any[]>([]);
    const [active, setActive] = useState(null);

    // const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
    // console.log(data);

    // useEffect(() => {
    //     if (data) {
    //         setQuestions(data?.layout.faq);
    //     }
    //     if (isSuccess) {
    //         refetch();
    //         toast.success("FAQ updated succesfully");
    //     }

    //     if (error) {
    //         if ("data" in error) {
    //             const errorData = error as any;
    //             toast.error(errorData.data.message);
    //         }
    //     }
    // }, [data, isSuccess, error]);

    const toggleQuestions = (id: any) => {
        setFaqs((prevQuestions: any) =>
            prevQuestions.map((q: any) =>
                q.id === id ? { ...q, active: !q.active } : q
            )
        );
    };

    const handleQuestionChange = (id: any, value: string) => {
        setFaqs((prevQuestions: any) =>
            prevQuestions.map((q: any) =>
                q._id === id ? { ...q, question: value } : q
            )
        );
    };

    const handleAnswerChange = (id: any, value: string) => {
        setFaqs((prevQuestions: any) =>
            prevQuestions.map((q: any) =>
                q._id === id ? { ...q, answer: value } : q
            )
        );
    };

    const newFaqHandler = () => {
        setFaqs([
            ...faqs,
            {
                question: "",
                answer: "",
            },
        ]);
    };

    const areQuestionsUnChanged = (
        originalQuestions: any[],
        newQuestions: any[]
    ) => {
        return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
    };

    const isAnyQuestionEmpty = (questions: any[]) => {
        return questions.some((q) => q.question === "" || q.answer === "");
    };

    const handleEdit = async () => {
        if (
            !isAnyQuestionEmpty(questions) ||
            !areQuestionsUnChanged(data?.layout?.faq, questions)
        ) {
            await editLayout({
                type: "FAQ",
                faq: questions,
            });
        }
    };

    return (
        <div className="w-[90%] 825:w-[80%] m-auto mt-[120px]">
            <div className="mt-[12px]">
                <Accordion type="single" collapsible>
                    {faqs.map((faq: FAQ) => (
                        <AccordionItem
                            key={faq.id}
                            value={faq.id}
                            className={`${faq.id !== faqs[0].id && "border-t"
                                } border-gray-200 pt-6`}
                        >
                            {/* <dt className="text-lg"> */}
                            <AccordionTrigger
                                className="flex items-start justify-between text-black dark:text-white w-full text-left focus:outline-none"
                                onClick={() => toggleQuestions(faq.id)}
                            >
                                <Input
                                    className={`${styles.input} !border-none`}
                                    value={faq.question}
                                    onChange={(e: MouseEvent<HTMLInputElement>) =>
                                        handleQuestionChange(faq.id, e.target.value)
                                    }
                                    placeholder="Add your Question..."
                                />
                                <span className="ml-6 mt-3 flex-shrink-0">
                                    {faq.id === active ? (
                                        <HiMinus className="h-6 w-6" />
                                    ) : (
                                        <HiPlus className="h-6 w-6" />
                                    )}
                                </span>
                            </AccordionTrigger>
                            {/* </dt> */}
                            {q.active && (
                                <dd className="mt-2 pr-12">
                                    <input
                                        className={`${styles.input} !border-none`}
                                        value={q.answer}
                                        onChange={(e: any) =>
                                            handleAnswerChange(q._id, e.target.value)
                                        }
                                        placeholder="Add your Answer...."
                                    />
                                    <span className="ml-6 flex-shrink-0">
                                        <AiFillDelete
                                            className="text-black dark:text-white text-[18px] cursor-pointer"
                                            onClick={() => {
                                                setQuestions((prevQuestion: any) =>
                                                    prevQuestion.filter(
                                                        (item: any) => item._id !== q._id
                                                    )
                                                );
                                            }}
                                        />
                                    </span>
                                </dd>
                            )}
                        </div>
                    ))}
                </dl>
                <br />
                <br />
                <IoMdAddCircleOutline
                    className="text-black dark:text-white text-[25px] cursor-pointer"
                    onClick={newFaqHandler}
                />
            </div>
            <div
                className={`${styles.button
                    } !w-[100px] !h-[40px] !min-h-[40px] dark:text-white text-black bg-[#0000001e] dark:bg-[#cccccc34] 
                                ${areQuestionsUnChanged(
                        data?.layout?.faq,
                        questions
                    ) || isAnyQuestionEmpty(questions)
                        ? "cursor-not-allowed"
                        : "cursor-pointer !bg-[#42d383]"
                    } rounded absolute bottom-12 right-12`}
                onClick={
                    areQuestionsUnChanged(data?.layout?.faq, questions) ||
                        isAnyQuestionEmpty(questions)
                        ? () => null
                        : handleEdit
                }
            >
                Save
            </div>
        </div>
    );
}