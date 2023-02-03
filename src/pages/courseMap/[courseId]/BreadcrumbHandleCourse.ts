import { useBreadCrumb } from "context";
import useLocalStorage from "hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function BreadcrumbHandleCourse() {
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
                link: `/courseMap/${courseParam}`,
            }
        ])
        setStoredPath(pathList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [splitted[1]])


    return {
        courseId
    }
}