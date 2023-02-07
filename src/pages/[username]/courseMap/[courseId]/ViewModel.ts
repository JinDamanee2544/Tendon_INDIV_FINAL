import TYPES, { Lesson } from "linkWithBackend/interfaces/TendonType";
import { getLessonInformation } from "linkWithBackend/lessonHandle/lessonData";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const memService = container.get<MemoryService>(TYPES.MemoryService)

export default function ViewModel() {
    const router = useRouter();
    const lessonId = router.query.lessonId ? router.query.lessonId.toString() : "";

    const [lessonName, setLessonName] = useState<string>("")

    const courseID = memService.getLocalStorage('courseID')
    const courseName = memService.getLocalStorage('courseName')
    const username = memService.getLocalStorage('firstName') + memService.getLocalStorage('lastName') 

    useEffect(() => {
        let promiseLoading = new Promise<Lesson>((resolve, reject) => {
            let tmpValue
            if (lessonId.trim() !== "" && lessonId !== undefined) {
                tmpValue = getLessonInformation(lessonId)
            } else {
                tmpValue = {} as Lesson
            }
            resolve(tmpValue)
        })
        promiseLoading.then(value => {
            if (value.name !== undefined) {
                setLessonName(value.name)
            }
        })
    }, [lessonId])
    
    return {
        courseID: courseID,
        courseName: courseName,
        username : username,
        lessonName: lessonName,
        lessonId: lessonId
    }
}