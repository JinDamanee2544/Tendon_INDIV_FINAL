import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import MainLayout from "@components/Layout/MainLayout";
import LessonNode from "@components/learningNode";
import { mockLearningNode } from "@customTypes/mockData";
import { LearningNode } from "@customTypes/tendonAPItype";
import { useBreadCrumb } from "context/breadCrumb";
import useLocalStorage from "hooks/useLocalStorage";
import useNavPath from "hooks/useNavPath";
import { Lesson } from "linkWithBackend/interfaces/TendonType";
import { getLessonInformation } from "linkWithBackend/lessonHandle/lessonData";
import { ContainerProviderTendon } from "linkWithBackend/services/container";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";

// Fetch Learning Node Data
const getLearningNodeById = (id: string): LearningNode => {
    return mockLearningNode;
}

const Lesson = () => {
    const router = useRouter();
    const lessonId = router.query.lessonId ? router.query.lessonId.toString() : "";
    console.log("id: ", lessonId)
    const { pathList, setPathList } = useBreadCrumb()                               // Display Path
    const [storedPath, setStoredPath] = useLocalStorage('path', pathList);          // cache for refreshing page 
    const mockLearningNode = getLearningNodeById(lessonId);
    const [lessonName, setLessonName] = useState<string>("")

    // useNavPath({
    //     page: 'LearningNode',
    //     mockLearningNode: mockLearningNode
    // });

    useEffect(() => {
        let promise = new Promise<Lesson>((resolve, reject) => {
            const tmpValue = getLessonInformation(lessonId)
            resolve(tmpValue)
        })
        promise.then( value => {
            setLessonName(value.name)

            // -------
            setPathList((prev) => {
                if (prev.length != 0) {
                    return [
                        ...prev,
                        {
                            name: value.name || 'Error',
                            link: 'มีไปก็กดไม่ได้ (ตาม Usecase)',
                        }
                    ]
                } else {    // no previous path  (For refresh)
                    return [
                        ...storedPath,
                        {
                            name: value.name || 'Error',
                            link: 'มีไปก็กดไม่ได้ (ตาม Usecase)',
                        }
                    ]
                }
            })
            setStoredPath(pathList);
            // --------
        })
        
    }, [])

    return (
        <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
                <LessonNode
                    lesson_id = {lessonId} 
                />
            </Suspense>
        </MainLayout>
    )
}

export default Lesson;