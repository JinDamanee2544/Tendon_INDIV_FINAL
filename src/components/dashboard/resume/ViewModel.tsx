import TYPES, { Course, MemType } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_service"
import container from "linkWithBackend/services/inversify.config"
import MemoryService from "linkWithBackend/services/memory_service"
import ProgressService from "linkWithBackend/services/progress_service"
import Router from "next/router"
import { useEffect, useState } from "react"
import { CourseWithProgress } from "types"

const memService = container.get<MemoryService>(TYPES.MemoryService)
const courseService = container.get<CourseService>(TYPES.CourseService)
const progressService = container.get<ProgressService>(TYPES.ProgressService)

export const courseStyle = (progress: number): string => {
    if (progress === 100) {
        return 'dark:border-2 dark:shadow-purple-neon dark:border-purple-light'
    } else {
        return ''
    }
}

export default function ViewModel() {
    const [courses, setCourses] = useState<CourseWithProgress[]>([] as CourseWithProgress[])

    const extendProgressOnCourse = async (courses: Course[]) => {
        if (courses.length === 0) return
        const courseWithProgress: CourseWithProgress[] = await Promise.all(
            courses.map(async (course) => {
                const resp = await progressService.getCoursesProgress(course.ID)
                return {
                    ...course,
                    progress: resp.progress
                }
            }))
        setCourses(courseWithProgress)
    }

    useEffect(() => {
        let courses = [] as Course[]
        const resumeCourseID: string = memService.getLocalStorage(MemType.courseIDs)
        const courseLoading = new Promise<Course[]>((resolve, reject) => {
            const fetchingCourseData = async () => {
                const result = await courseService.getManyCourseByID(resumeCourseID)
                const course = result.courses
                if (result.status === 400) {
                    Router.push("/login")
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
        courseLoading.then((finishLoadingCourses) => {
            courses = finishLoadingCourses
        }).then(() => {
            extendProgressOnCourse(courses)
        })
    }, [])
    return {
        courses,
    }
} 
