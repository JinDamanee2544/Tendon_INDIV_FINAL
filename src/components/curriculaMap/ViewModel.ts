import { LearningLessonNodeProps, RenderLearningLessonNodeProps } from "@customTypes/index"
import TYPES, { Course } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_services"
import container from "linkWithBackend/services/inversify.config"
import MemoryService from "linkWithBackend/services/memory_services"
import { useEffect, useMemo, useState } from "react"
import NewBackendConvert from "./BackendConverter"
import { prepNode } from "./LeaningNodeViewModel"


export default function ViewModel(lid: string): RenderLearningLessonNodeProps[] {

    const [renderingGraph, setrenderingGraph] = useState<RenderLearningLessonNodeProps[]>([])
    // const [courseData, setCourseData] = useState<Course>({} as Course)
    // const [lessonGraph, setLessonGraph] = useState<LearningLessonNodeProps>({} as LearningLessonNodeProps)

    useEffect(() => {
        const fetchCourse = async () => {
            if (lid) {
                const courseService = container.get<CourseService>(TYPES.CourseService)
                const memService = container.get<MemoryService>(TYPES.MemoryService)
                const course = await courseService.getCourseById(lid, memService.getToken())
                memService.setCourse(lid, course.name)
                let myClass = new NewBackendConvert(course)
                const t = await myClass.converter()
                const lessonGraph: LearningLessonNodeProps = myClass.getPrepArray
                const res = prepNode(lessonGraph, () => false)
                setrenderingGraph([...res])
            }
        }
        fetchCourse()
    }, [lid])

    return renderingGraph
    // return []
}

