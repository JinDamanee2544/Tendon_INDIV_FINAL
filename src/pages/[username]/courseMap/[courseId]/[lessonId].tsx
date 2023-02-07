import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import LessonNode from "@components/lessonPanel";

import { Suspense } from "react";
import BreadcrumbHandleLesson from './BreadcrumbHandleLesson'
import MainLayout from "@layout/MainLayout";

const Lesson = () => {
    const { lessonId } = BreadcrumbHandleLesson()

    if (lessonId === undefined || lessonId.trim() === "") {
        return <LoadingSpinner />
    }
    return (
        <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
                <LessonNode lesson_id={lessonId} />
            </Suspense>
        </MainLayout>
    )
}

export default Lesson;