import TYPES, { Lesson } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import LessonService from "linkWithBackend/services/lesson_service";
import MemoryService from "linkWithBackend/services/memory_service";
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
        let tmpValue = {} as Lesson
        if (lessonId.trim() !== "" && lessonId !== undefined) {

            const promiseLesson = new Promise<Lesson>((resolve, reject) => {
                const lessonService = container.get<LessonService>(TYPES.LessonService)
                const lessonInformation = async () => {
                    tmpValue = await lessonService.getLessonById(courseID, lessonId)
                    resolve(tmpValue)
                }
                lessonInformation()
            })

            promiseLesson.then(value => {
                if (value.Title !== undefined) {
                    setLessonName(value.Title)
                }
            })
        } else {
            tmpValue = {} as Lesson
        }
    }, [lessonId])

    return {
        courseID: courseID,
        courseName: courseName,
        username: username,
        lessonName: lessonName,
        lessonId: lessonId
    }
}