import TYPES, { Course } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_services"
import container from "linkWithBackend/services/inversify.config"
import MemoryService from "linkWithBackend/services/memory_services"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ViewModel() {
    const [courses, setCourses] = useState<Course[]>([] as Course[])
    const router = useRouter()

    useEffect(() => {
        const resumeCourseID: string[] = ["63becc58e68081422d62f422", "63becc6ce68081422d62f423", "63becc7de68081422d62f424"]

        const courseService = container.get<CourseService>(TYPES.CourseService)

        const courseLoading = Promise.all(resumeCourseID.map(async (id) => {
            const memService = container.get<MemoryService>(TYPES.MemoryService)
            const course = await courseService.getCourseById(id, memService.getLocalStorage("tokenMEM") )
            if (courseService.getStatus() === 409) {
                router.push("/login")
            }
            return course
        }))

        courseLoading.then((course) => {
            setCourses([...course])
        })

    }, [router])

    return courses
} 