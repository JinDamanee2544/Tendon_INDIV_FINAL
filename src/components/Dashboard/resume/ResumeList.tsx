import { motion } from 'framer-motion'
import { Xwrapper } from 'react-xarrows'
import { Course } from 'linkWithBackend/interfaces/TendonType'
import { CourseGetHandle } from 'pages/adminControl/service_page/CourseView'

interface propsInterface {
    body: Course
}

const ResumeList = () => {

    const resumeCourseID: string[] = ["63becc58e68081422d62f422", "63becc6ce68081422d62f423", "63becc7de68081422d62f424"]

    return (
        <motion.main
            className='flex flex-col gap-10 justify-center'
        >
            <Xwrapper>
                {
                    resumeCourseID.map((item, index) => {
                        return (
                            <div key={index}>
                                <CourseGetHandle id={item} component={"resume"} key={item} ></CourseGetHandle>
                            </div>
                        )
                    })
                }
            </Xwrapper>
        </motion.main>
    )
}
export default ResumeList;