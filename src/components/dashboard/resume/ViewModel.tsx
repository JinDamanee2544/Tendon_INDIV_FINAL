import TYPES, { Course, MemType } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_service"
import container from "linkWithBackend/services/inversify.config"
import MemoryService from "linkWithBackend/services/memory_service"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ViewModel() {
    const [courses, setCourses] = useState<Course[]>([] as Course[])
    const router = useRouter()

    useEffect(() => {
        const memService = container.get<MemoryService>(TYPES.MemoryService)
        const resumeCourseID: string = memService.getLocalStorage(MemType.courseIDs)

        const courseService = container.get<CourseService>(TYPES.CourseService)

        const courseLoading = new Promise<Course[]>((resolve, reject) => {
            const fetchingCourseData = async () => {
                const course = await courseService.getManyCourseByID(resumeCourseID)
                if (courseService.getStatus() === 409) {
                    router.push("/login")
                }
                resolve(course)
                return course
            }
            if (resumeCourseID !== "") {
                fetchingCourseData()
            } else {
                resolve([])
            }
        })

        courseLoading.then((courses) => {
            setCourses(courses)
        })

    }, [router])

    return courses
} 
