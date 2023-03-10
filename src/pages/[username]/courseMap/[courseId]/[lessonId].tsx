import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import LessonPanel from "@components/nodePanel";
import { Suspense } from "react";
import BreadcrumbHandleLesson from './BreadcrumbHandleLesson'
import MainLayout from "@layout/MainLayout";
import { AuthProvider } from "context";

const Lesson = () => {
    const { lessonId } = BreadcrumbHandleLesson()

    if (lessonId === undefined || lessonId.trim() === "") {
        return <LoadingSpinner />
    }
    return (
        <AuthProvider>
            <MainLayout>
                <Suspense fallback={<LoadingSpinner />}>
                    <LessonPanel lesson_id={lessonId} />
                </Suspense>
            </MainLayout>
        </AuthProvider>
    )
}

export default Lesson;