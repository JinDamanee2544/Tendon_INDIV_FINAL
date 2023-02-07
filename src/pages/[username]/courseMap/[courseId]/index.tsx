import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import BreadcrumbHandleCourse from "./BreadcrumbHandleCourse";
import GraphLayout from "layout/GraphLayout";
const CourseMap = dynamic(() => import("@components/courseMap"));

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
        <GraphLayout>
            <Suspense fallback={<LoadingSpinner />}>
                <CourseMap lid={courseId} />
            </Suspense>
        </GraphLayout>
    )
}
export default CoursePage;