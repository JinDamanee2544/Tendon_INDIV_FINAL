import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import LessonPanel from "@components/nodePanel";
import { Suspense } from "react";
import MainLayout from "@layout/MainLayout";
import { AuthProvider } from "context";
import BreadcrumbHandleLesson from "context/breadcrumb/BreadcrumbHandleLesson";

const Lesson = () => {
    const { lessonId, courseId } = BreadcrumbHandleLesson()

    if (lessonId === undefined || lessonId.trim() === "") {
        return <LoadingSpinner />
    }
    return (
        <AuthProvider>
            <MainLayout>
                <Suspense fallback={<LoadingSpinner />}>
                    <LessonPanel lesson_id={lessonId} course_id={courseId} />
                </Suspense>
            </MainLayout>
        </AuthProvider>
    )
}

export default Lesson;