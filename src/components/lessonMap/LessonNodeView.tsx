import { StatusType } from 'types'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useMemo, useRef } from 'react'
import { useXarrow } from 'react-xarrows'
import { nodeStyle, nodeSymbol } from './ViewModel'

type LessonNodeViewProps = {
    lessonId: string
    lessonName: string
    isRender: boolean
    status: StatusType
}

const LessonNodeView = (props: LessonNodeViewProps) => {
    const { lessonId, lessonName, isRender, status } = props;
    const updateArrow = useXarrow();
    const router = useRouter();
    const nodeRef = useRef(null);

    const statusColor = useMemo(() => nodeStyle(status), [status])
    const symbol = useMemo(() => nodeSymbol(status), [status])

    return (
        <>
            {isRender && (
                <div className='indicator'>
                    <span className="indicator-start badge indicator-item mx-10 dark:border-0 dark:bg-gray-medium dark:shadow-xl dark:shadow-gray-dark">{symbol}</span>
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
                        <h1>{lessonName}</h1>
                    </motion.button>
                </div>
            )}
        </>
    )
}

export default LessonNodeView