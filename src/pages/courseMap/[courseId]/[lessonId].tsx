import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import MainLayout from "layout/MainLayout";
import LessonNode from "@components/learningNode";
import { mockLearningNode } from "@customTypes/mockData";
import { LearningNode } from "@customTypes/tendonAPItype";
import { useBreadCrumb } from "context/breadCrumb";
import useLocalStorage from "hooks/useLocalStorage";
import useNavPath from "hooks/useNavPath";
import TYPES, { Lesson } from "linkWithBackend/interfaces/TendonType";
import { getLessonInformation } from "linkWithBackend/lessonHandle/lessonData";
import { ContainerProviderTendon } from "linkWithBackend/services/container";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_services";
import viewModel from "@components/learningNode/viewModel";

// Fetch Learning Node Data
const getLearningNodeById = (id: string): LearningNode => {
    return mockLearningNode;
}

const Lesson = () => {
    const router = useRouter();
    const lessonId = router.query.lessonId ? router.query.lessonId.toString() : "";
    const { pathList, setPathList } = useBreadCrumb()                               // Display Path
    const [storedPath, setStoredPath] = useLocalStorage('path', pathList);          // cache for refreshing page 
    const [lessonName, setLessonName] = useState<string>("")

    const localMem = viewModel()

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

    return (
        <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
                { lessonId !== undefined && lessonId.trim() !== "" && 
                    <LessonNode
                        lesson_id={lessonId}
                    /> 
                }
            </Suspense>
        </MainLayout>
    )
}

export default Lesson;