import { Lesson } from '../../../linkWithBackend/interfaces/TendonType';
import { useEffect } from 'react';
import { useState } from 'react';
import { useBreadCrumb } from "context";
import useLocalStorage from "hooks/useLocalStorage";
import ViewModel from 'pages/courseMap/[courseId]/viewModel';
import { getLessonInformation } from 'linkWithBackend/lessonHandle/lessonData';
import { useRouter } from 'next/router';

export default function BreadcrumbHandleLesson() {
    const router = useRouter();
    const lessonId = router.query.lessonId ? router.query.lessonId.toString() : "";
    const { pathList, setPathList } = useBreadCrumb()                               // Display Path
    const [storedPath, setStoredPath] = useLocalStorage('path', pathList);          // cache for refreshing page 
    const [lessonName, setLessonName] = useState<string>("")

    const localMem = ViewModel()

    useEffect(() => {
        let promise = new Promise<Lesson>((resolve, reject) => {
            let tmpValue
            if (lessonId.trim() !== "" && lessonId !== undefined) {
                tmpValue = getLessonInformation(lessonId)
            } else {
                tmpValue = {} as Lesson
            }
            resolve(tmpValue)
        })
        promise.then(value => {
            if (value.name !== undefined) {
                setLessonName(value.name)
            }
        })
    }, [lessonId])

    useEffect(() => {
        setPathList([
            {
                name: 'Dashboard',
                link: '/',
            },
            {
                name: `${localMem.courseName}`,
                link: `/courseMap/${localMem.courseID}-${localMem.courseName}`,
            },
            {
                name: `${lessonName}`,
                link: `/`,
            }
        ])
        setStoredPath([
            {
                name: 'Dashboard',
                link: '/',
            },
            {
                name: `${localMem.courseName}`,
                link: `/courseMap/${localMem.courseID}-${localMem.courseName}`,
            },
            {
                name: `${lessonName}`,
                link: `/`,
            }
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonName])

    return {
        lessonId
    }
}