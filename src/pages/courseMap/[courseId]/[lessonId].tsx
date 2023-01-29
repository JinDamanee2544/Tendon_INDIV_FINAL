import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import MainLayout from "layout/MainLayout";
import LessonNode from "@components/learningNode";
import { mockLearningNode } from "@customTypes/mockData";
import { LearningNode } from "@customTypes/tendonAPItype";
import { Suspense } from "react";
import BreadcrumbHandleLesson from './BreadcrumbHandleLesson'

// Fetch Learning Node Data
const getLearningNodeById = (id: string): LearningNode => {
    return mockLearningNode;
}

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