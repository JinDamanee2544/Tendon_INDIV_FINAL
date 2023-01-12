import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Xarrow, { Xwrapper } from 'react-xarrows'
import { resumeProps } from '../../../data'
import ArrowBox from '../../baseComponents/ArrowBox'
import ResumeItem from './ResumeItem'

import { Course } from 'linkWithBackend/interfaces/TendonType'
import { CourseGetHandle } from 'pages/adminControl/service_page/CourseView'
import { ContainerProviderTendon } from 'linkWithBackend/services/container'
// import { observer } from 'mobx-react'
// import { useTendonContainer } from 'linkWithBackend/services/container'
// import CourseDataViewModel from 'pages/adminControl/service_page/CourseViewModel'
// import { token } from 'pages/adminControl/_demo_setting'

interface propsInterface {
    body: Course
}

const ResumeList = () => {

    const resumeData: string[] = ["63becc58e68081422d62f422", "63becc6ce68081422d62f423", "63becc7de68081422d62f424"]

    return (
        <motion.main
            className='flex flex-col gap-10 justify-center'
        >
            <Xwrapper>
                {
                    resumeData.map((item, index) => {
                        return (
                            <div key={index}>
                                <ContainerProviderTendon>
                                    <CourseGetHandle id = { item } key = { item } ></CourseGetHandle>
                                </ContainerProviderTendon>
                            </div>
                        )
                    })
                }
            </Xwrapper>
        </motion.main>
    )
}
export default ResumeList;