import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import MainLayout from "layout/MainLayout";
import LessonNode from "@components/lessonPanel";

import { Suspense } from "react";
import BreadcrumbHandleLesson from './BreadcrumbHandleLesson'

const Lesson = () => {
    const { lessonId } = BreadcrumbHandleLesson()

    return (
        <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
                {lessonId !== undefined && lessonId.trim() !== "" &&
                    <LessonNode
                        lesson_id={lessonId}
                    />
                }
            </Suspense>
        </MainLayout>
    )
}

export default Lesson;