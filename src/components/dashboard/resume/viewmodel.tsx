import TYPES, { Course } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_services"
import container from "linkWithBackend/services/inversify.config"
import MemoryService from "linkWithBackend/services/memory_services"
import { useEffect, useState } from "react"

export default function Viewmodel() {
    const [courses, setCourses] = useState<Course[]>([] as Course[])

    useEffect(() => {
        const resumeCourseID: string[] = ["63becc58e68081422d62f422", "63becc6ce68081422d62f423", "63becc7de68081422d62f424"]

        const courseService = container.get<CourseService>(TYPES.CourseService)

        const courseLoading = Promise.all(resumeCourseID.map(async (id) => {
            const memService = container.get<MemoryService>(TYPES.MemoryService)
            const course = await courseService.getCourseById(id, memService.getToken())
            return course
        }))

        courseLoading.then((course) => {
            setCourses([...course])
        })
    }, [])

    return courses
} 