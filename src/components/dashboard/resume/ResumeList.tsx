import { motion } from 'framer-motion'
import { Xwrapper } from 'react-xarrows'
import TYPES, { Course } from 'linkWithBackend/interfaces/TendonType'
import ResumeItem from './ResumeItem'

import { useTheme } from 'next-themes'
import { useTendonContainer } from 'linkWithBackend/services/container'
import CourseService from 'linkWithBackend/services/course_services'
import { useEffect, useState } from 'react'
import { getToken } from '@components/shareData/user_setting'
import ArrowBox from '@components/baseComponents/ArrowBox'
import Xarrow from 'react-xarrows'
interface propsInterface {
    body: Course
}

const ResumeList = () => {
    const { theme } = useTheme()
    const container = useTendonContainer()
    const courseService = container.get<CourseService>(TYPES.CourseService)

    const [courses, setCourses] = useState<Course[]>([] as Course[])

    useEffect(() => {
        const resumeCourseID: string[] = ["63becc58e68081422d62f422", "63becc6ce68081422d62f423", "63becc7de68081422d62f424"]
        const courseLoading = Promise.all(resumeCourseID.map(async (id) => {
            const course = await courseService.getCourseById(id, getToken())
            return course
        }))

        courseLoading.then((course) => {
            setCourses(prev => [...prev, ...course])
        })
    }, [])


    return (
        <motion.main
            className='flex flex-col gap-10 justify-center'
        >
            <Xwrapper>
                {
                    courses.map((course, index) => {
                        return (
                            <div key={index}>
                                <>
                                    <ResumeItem
                                        key={course.id}
                                        id={course.id}
                                        courseData={course}
                                        setIsReady={() => false}
                                    />
                                    {
                                        (
                                            <ArrowBox>
                                                <Xarrow
                                                    start={'dashboard'}
                                                    end={course.id}
                                                    color={theme === 'light' ? '#475569' : '#961EFF'}
                                                />
                                            </ArrowBox>
                                        )
                                    }
                                </>
                            </div>
                        )
                    })
                }
            </Xwrapper>
        </motion.main>
    )
}
export default ResumeList;