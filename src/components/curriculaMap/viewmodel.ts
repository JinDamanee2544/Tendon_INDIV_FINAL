import { getToken } from "@components/ShareData/user_setting"
import { LearningLessonNodeProps, RenderLearningLessonNodeProps } from "@customTypes/index"
import TYPES, { Course } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_services"
import container from "linkWithBackend/services/inversify.config"
import { useEffect, useMemo, useState } from "react"
import NewBackendConvert from "./BackendConverter"
import { prepNode } from "./LeaningNodeViewModel"


export default function useViewmodel(lid: string): RenderLearningLessonNodeProps[] {

    const [renderingGraph, setrenderingGraph] = useState<RenderLearningLessonNodeProps[]>([])
    // const [courseData, setCourseData] = useState<Course>({} as Course)
    // const [lessonGraph, setLessonGraph] = useState<LearningLessonNodeProps>({} as LearningLessonNodeProps)

    useEffect(() => {
        const fetchCourse = async () => {
            if (lid) {
                const courseService = container.get<CourseService>(TYPES.CourseService)
                const course = await courseService.getCourseById(lid, getToken())
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

