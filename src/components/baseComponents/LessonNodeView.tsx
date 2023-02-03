import { StatusType } from 'customTypes'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useMemo, useRef } from 'react'
import { useXarrow } from 'react-xarrows'

type LearningNodeProps = {
    // statusColor: string
    courseId: string
    courseName: string
    isRender: boolean
    status: StatusType
}

const nodeStatusColor = (status: StatusType): string => {
    switch (status) {
        case StatusType.NOTSTARTED:
            return ''
        case StatusType.INPROGRESS:
            return 'bg-purple-light dark:border-2 dark:border-pale-yellow dark:shadow-pale-yellow'
        case StatusType.COMPLETED:
            return 'bg-purple-neon dark:border-2 dark:border-purple-light dark:shadow-purple-neon'
        default:
            throw new Error('Invalid status')
    }
}

const LearningNode = ({ courseId: lessonId, courseName, isRender, status }: LearningNodeProps) => {
    const updateArrow = useXarrow();
    const router = useRouter();
    const nodeRef = useRef(null);

    const statusColor = useMemo(() => nodeStatusColor(status), [status])

    return (
        <>
            {isRender && (
                <div className='indicator'>
                    <span className="indicator-item indicator-start badge mx-10 dark:bg-gray-medium dark:shadow-xl dark:shadow-gray-dark dark:border-0">
                        {["✓", "...", "!"][status]}
                    </span>
                    <motion.button
                        className={`course-node ${statusColor}`}
                        id={lessonId.toString()}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1, scale: 1,
                            // height: isOpen ? 'auto' : 'auto',
                        }}
                        ref={nodeRef}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2, type: 'spring', stiffness: 100 }}
                        // drag
                        // dragConstraints={nodeRef}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        onUpdate={() => {
                            setInterval(updateArrow, 200)
                        }}
                        onClick={() => {
                            router.push({
                                pathname: `${router.asPath}/${lessonId}`,
                            })
                        }}
                    >
                        <h1>{courseName}</h1>
                    </motion.button>
                </div>
            )}
        </>

    )
}

export default LearningNode