import { getToken } from "@components/shareData/user_setting"
import { LearningLessonNodeProps, RenderLearningLessonNodeProps } from "@customTypes/index"
import TYPES, { Course } from "linkWithBackend/interfaces/TendonType"
import { useTendonContainer } from "linkWithBackend/services/container"
import CourseService from "linkWithBackend/services/course_services"
import { useEffect, useMemo, useState } from "react"
import { backendConvert } from "./LeaningNodeViewModel"
import { prepNode } from "./LeaningNodeViewModel"


export default function useCurriculaMapViewModel(lid: string): RenderLearningLessonNodeProps[] {

    const [course, setCourse] = useState<Course>({} as Course)

    const container = useTendonContainer()
    const courseService = container.get<CourseService>(TYPES.CourseService)

    const lessonGraph: LearningLessonNodeProps = useMemo(() => backendConvert(course), [course])

    const mapRenderingGraph: RenderLearningLessonNodeProps[] = useMemo(() => prepNode(lessonGraph, () => false), [lessonGraph])

    useEffect(() => {
        if (lid) {
            const courseLoading = courseService.getCourseById(lid, getToken())
            courseLoading.then((course) => {
                setCourse(course)
            })
        }
    }, [lid, courseService])

    return mapRenderingGraph
}




