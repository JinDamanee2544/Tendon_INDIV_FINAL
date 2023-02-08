import { useBreadCrumb } from "context";
import TYPES from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_service";
import { useRouter } from "next/router";
import { useEffect } from "react";

const memService = container.get<MemoryService>(TYPES.MemoryService)

// const curriculaData = getCurriculaNodeData(courseId);

export default function BreadcrumbHandleCourse() {
    const router = useRouter();

    // ------------------- Extract later -------------------
    const courseParam = router.query.courseId ? router.query.courseId.toString() : ""
    let splitted: string[] = courseParam.split("-", 2)
    let courseId = ""
    let courseName = ""
    if (splitted[1] !== undefined) {
        courseName = splitted[1]
    }
    if (splitted[0] !== undefined) {
        courseId = splitted[0]
    }
    // -----------------------------------------------------

    const { pathList, setPathList } = useBreadCrumb()
    useEffect(() => {
        const username = memService.getLocalStorage('firstName') + memService.getLocalStorage('lastName')
        setPathList([
            {
                name: 'Dashboard',
                link: `/${username}/dashboard`,
            },
            {
                name: courseName,
                link: `/${username}/courseMap/${courseParam}`,
            }
        ])
    }, [courseParam,courseName,setPathList])

    return {courseId}
}