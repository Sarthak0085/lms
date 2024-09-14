"use memo";

import { getQuestions } from "@/actions/questions/get-questions";
import { Breadcrumbs } from "@/components/admin/breadcrumbs";
import { PageContainer } from "@/components/admin/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/data-table-skeleton";
import { QuestionsTable } from "@/components/table/questions/question-table";
import { SearchParams } from "@/types";
import { ValidateSearchParams } from "@/validations";
import { Suspense } from "react";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'Questions', link: '/admin/questions' }
];

export interface CoursesPageProps {
    searchParams: SearchParams;
}


const QuestionsPage = ({ searchParams }: CoursesPageProps) => {
    const search = ValidateSearchParams(searchParams)
    const questions = getQuestions(search);
    return (
        <PageContainer>
            <div className="space-y-2 mt-10">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between pt-4 space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!!</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of all the questions!
                        </p>
                    </div>
                </div>
                <Suspense
                    fallback={
                        <DataTableSkeleton
                            columnCount={5}
                            searchableColumnCount={1}
                            filterableColumnCount={2}
                            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                            shrinkZero
                        />
                    }
                >
                    {/**
                     * Passing promises and consuming them using React.use for triggering the suspense fallback.
                     * @see https://react.dev/reference/react/use
                     */}
                    <QuestionsTable questionsPromise={questions} />
                </Suspense>
            </div>
        </PageContainer>
    );
}

export default QuestionsPage;