import { LearningLessonNodeProps, RenderLearningLessonNodeProps } from "@customTypes/index"
import TYPES, { localStorageInterface } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_services"
import container from "linkWithBackend/services/inversify.config"
import MemoryService from "linkWithBackend/services/memory_services"
import { useEffect, useState } from "react"
import NewBackendConvert from "./BackendConverter"
import { prepNode } from "./LessonNodeViewModel"


export default function ViewModel(lid: string): RenderLearningLessonNodeProps[] {

    const [renderingGraph, setrenderingGraph] = useState<RenderLearningLessonNodeProps[]>([])
    // const [courseData, setCourseData] = useState<Course>({} as Course)
    // const [lessonGraph, setLessonGraph] = useState<LearningLessonNodeProps>({} as LearningLessonNodeProps)

    useEffect(() => {
        const fetchCourse = async () => {
            if (lid) {
                const courseService = container.get<CourseService>(TYPES.CourseService)
                const memService = container.get<MemoryService>(TYPES.MemoryService)
                const course = await courseService.getCourseById(lid, memService.getLocalStorage('token'))
                let memStore = {} as localStorageInterface
                memService.setLocalStorage({...memStore, courseID: lid, courseName: course.name})
                let Converter = new NewBackendConvert(course)
                await Converter.converter()
                const lessonGraph: LearningLessonNodeProps = Converter.getPrepArray
                const res = prepNode(lessonGraph, () => false)
                setrenderingGraph([...res])
            }
        }
        fetchCourse()
    }, [lid])

    return renderingGraph
    // return []
}

