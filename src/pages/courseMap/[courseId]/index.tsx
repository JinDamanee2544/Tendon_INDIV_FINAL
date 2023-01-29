import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import MainLayout from "layout/MainLayout";
import BreadcrumbHandleCourse from "./BreadcrumbHandleCourse";
const CourseMap = dynamic(() => import("@components/curriculaMap"));

// Fetch Curriculum Data
// const getCurriculaNodeData = (courseId: string): LearningLessonNodeProps => {
//     return {
//         lessonId: courseId,
//         lessonName: "Introduction to Programming",
//         status: StatusType.COMPLETED,
//         next: MockRelateCourse
//     }
// }

const CoursePage = () => {
    const { courseId } = BreadcrumbHandleCourse();

    return (
        <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
                <CourseMap lid={courseId} />
            </Suspense>
        </MainLayout>
    )
}
export default CoursePage;