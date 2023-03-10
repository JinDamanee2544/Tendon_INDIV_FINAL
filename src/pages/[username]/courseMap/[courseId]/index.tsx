import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import BreadcrumbHandleCourse from "./BreadcrumbHandleCourse";
import GraphLayout from "layout/GraphLayout";
import { AuthProvider } from "context";
const CourseMap = dynamic(() => import("@components/lessonMap"));

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
        <AuthProvider>
            <GraphLayout>
                <Suspense fallback={<LoadingSpinner />}>
                    <CourseMap lid={courseId} />
                </Suspense>
            </GraphLayout>
        </AuthProvider>
    )
}
export default CoursePage;