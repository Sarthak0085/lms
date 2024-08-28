"use client";

import { data } from '@/utils/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui';
import { MinusIcon, PlusIcon } from '@repo/ui/icon';
import React, { useState, useEffect } from 'react'

export const FAQSection = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        setQuestions(data?.layout?.faq);
    }, [data]);

    const toggleQuestion = (id: any) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    }

    return (
        <div className='w-[90%] 825:w-[80%] m-auto'>
            <h1 className={`text-black dark:text-white font-[500] font-Poppins text-center py-4 text-[40px]`}>
                Frequently Asked Questions
            </h1>
            <div className='my-12'>
                <Accordion type="single" collapsible>
                    {questions?.map((q) => (
                        <AccordionItem
                            key={q.id}
                            value={q.id}
                            className={`border-gray-200 ${q.id !== questions[0].id ? "border-t" : ""} pt-6`}
                        >
                            <AccordionTrigger
                                className="flex items-start justify-between text-black dark:text-white w-full text-left !no-underline focus:outline-none"
                                onClick={() => toggleQuestion(q.id)}
                            >
                                <span className='font-medium text-black dark:text-white'>{q.question}</span>
                                <span className="ml-6 flex-shrink-0">
                                    {activeQuestion === q.id ? (
                                        <MinusIcon className="h-4 w-4" />
                                    ) : (
                                        <PlusIcon className="h-4 w-4" />
                                    )}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="mt-5 pr-12">
                                <span className="text-base font-Poppins text-black dark:text-white">
                                    {q.answer}
                                </span>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}