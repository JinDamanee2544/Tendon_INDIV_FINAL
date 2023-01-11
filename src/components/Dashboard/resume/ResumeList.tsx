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
    const { theme } = useTheme();
    const [isReady, setIsReady] = useState(false);

    const resumeData: resumeProps[] = [
        {
            id: '101',
            courseName: "Web Development",
            setIsReady: setIsReady,
        },
        {
            id: '102',
            courseName: "Machine Learning",
            setIsReady: setIsReady,
        },
        {
            id: '103',
            courseName: "Embedded System",
            setIsReady: setIsReady,
        },
    ]

    //const resumeData: resumeProps[] = []

    return (
        <motion.main
            className='flex flex-col gap-10 justify-center'
        >
            <Xwrapper>
                {
                    resumeData.map((item, index) => {
                        return (
                            <div key={index}>
                                {/* <ResumeItem key={item.id} {...item} setIsReady={setIsReady} /> */}
                                <ContainerProviderTendon>
                                    <div>
                                        <CourseGetHandle id = { "63becc58e68081422d62f422" } ></CourseGetHandle>
                                    </div>
                                </ContainerProviderTendon>
                                {
                                    isReady && (
                                        <ArrowBox>
                                            <Xarrow
                                                start={'dashboard'}
                                                end={item.id.toString()}
                                                color={theme === 'light' ? '#475569' : '#961EFF'}
                                            />
                                        </ArrowBox>

                                    )
                                }
                            </div>
                        )
                    })
                }
            </Xwrapper>
        </motion.main>
    )
}
export default ResumeList;