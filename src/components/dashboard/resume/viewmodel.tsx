import { getToken } from "@components/shareData/user_setting"
import { Container } from "inversify"
import TYPES, { Course } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_services"
import { useEffect, useState } from "react"

export default function Viewmodel(container: Container) {
    const [courses, setCourses] = useState<Course[]>([] as Course[])

    useEffect(() => {
        const resumeCourseID: string[] = ["63becc58e68081422d62f422", "63becc6ce68081422d62f423", "63becc7de68081422d62f424"]

        const courseService = container.get<CourseService>(TYPES.CourseService)

        const courseLoading = Promise.all(resumeCourseID.map(async (id) => {
            const course = await courseService.getCourseById(id, getToken())
            return course
        }))

        courseLoading.then((course) => {
            setCourses([...course])
        })
    }, [])

    return courses
} 