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
import Viewmodel from './viewmodel'
interface propsInterface {
    body: Course
}

const ResumeList = () => {
    const { theme } = useTheme()
    const container = useTendonContainer()
    const courses = Viewmodel(container)

    return (
        <main className='flex flex-col gap-10 justify-center'>
            <Xwrapper>
                {
                    courses.map((course, index) => {

                        // if (course.id === undefined) {
                        //     return <h1 key={index}>Loading</h1>
                        // }

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
        </main>
    )
}
export default ResumeList;