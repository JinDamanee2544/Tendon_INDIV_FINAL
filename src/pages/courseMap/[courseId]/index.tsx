import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import MainLayout from "layout/MainLayout";
import { MockRelateCourse } from "@data/graphNode";
import { LearningLessonNodeProps, StatusType } from "@customTypes/index";
import { useBreadCrumb } from "context/breadCrumb";
import useLocalStorage from "hooks/useLocalStorage";
import useNavPath from "hooks/useNavPath";
import { ContainerProviderTendon, useTendonContainer } from "linkWithBackend/services/container";

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
    const router = useRouter();
    const courseParam = router.query.courseId ? router.query.courseId.toString() : ""
    // const [courseName, setCourseName] = useState("")
    var splitted: string[] = courseParam.split("-", 2)
    var courseId = ""
    var courseName = ""
    if (splitted[1] !== undefined) {
        courseName = splitted[1]
    }
    if (splitted[0] !== undefined) {
        courseId = splitted[0]
    }

    // const curriculaData = getCurriculaNodeData(courseId);
    const { pathList, setPathList } = useBreadCrumb()
    const [storedPath, setStoredPath] = useLocalStorage('path', pathList);

    useEffect(() => {
        setPathList([
            {
                name: 'Dashboard',
                link: '/',
            },
            {
                name: courseName,
                link: `/courseMap/${courseId}`,
            }
        ])
        setStoredPath(pathList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [splitted[1]])

    return (
        // <BreadcrumbProvider>
        <MainLayout>
            <ContainerProviderTendon>
                <Suspense fallback={<LoadingSpinner />}>
                    <CourseMap learningNodeData={courseId} />
                </Suspense>
            </ContainerProviderTendon>
        </MainLayout>
        // </BreadcrumbProvider>
    )
}
export default CoursePage;