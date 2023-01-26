import { getToken } from "@components/shareData/user_setting"
import { LearningLessonNodeProps, RenderLearningLessonNodeProps } from "@customTypes/index"
import TYPES, { Course } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_services"
import container from "linkWithBackend/services/inversify.config"
import { useEffect, useMemo, useState } from "react"
import { backendConvert, prepNode } from "./LeaningNodeViewModel"


export default function useViewmodel(lid: string): RenderLearningLessonNodeProps[] {

    const [renderingGraph, setrenderingGraph] = useState<RenderLearningLessonNodeProps[]>([])

    useEffect(() => {
        const fetchCourse = async () => {
            if (lid) {
                const courseService = container.get<CourseService>(TYPES.CourseService)
                const course = await courseService.getCourseById(lid, getToken())
                const lessonGraph: LearningLessonNodeProps = backendConvert(course)
                const res = prepNode(lessonGraph, () => false)

                setrenderingGraph([...res])
            }
        }
        fetchCourse()
    }, [lid])

    return renderingGraph
}




