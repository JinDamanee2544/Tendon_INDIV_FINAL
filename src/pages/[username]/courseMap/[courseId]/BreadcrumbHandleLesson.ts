import { useEffect } from 'react';
import { useBreadCrumb } from "context";
import ViewModel from './ViewModel';

export default function BreadcrumbHandleLesson() {
    const { pathList, setPathList } = useBreadCrumb()                               // Display Path
    const localMem = ViewModel()

    useEffect(() => {
        setPathList([
            {
                name: 'Dashboard',
                link: `/${localMem.username}/dashboard`,
            },
            {
                name: `${localMem.courseName}`,
                link: `/${localMem.username}/courseMap/${localMem.courseID}-${localMem.courseName}`,
            },
            {
                name: `${localMem.lessonName}`,             // TODO: Change Path!
                link: `/aaa`,
            }
        ])
    }, [localMem.lessonName,localMem.courseName,localMem.courseID,localMem.username,setPathList])

    return {
        lessonId : localMem.lessonId,
        courseId : localMem.courseID,
    }
}