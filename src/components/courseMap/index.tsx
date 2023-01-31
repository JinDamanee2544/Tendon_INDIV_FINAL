import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
import { motion } from 'framer-motion'
import React, { useEffect, useState } from "react"
import { Xwrapper } from 'react-xarrows';
import CourseNode from './LessonNode';
import ViewModel from './ViewModel';

interface LearningNodeMapProps {
    lid: string
}
// Entire View of the Course Map (Container)
const LearningNodeMap = ({ lid }: LearningNodeMapProps) => {
    const [childReady, setChildReady] = useState(false);
    const [onClient, setOnClient] = useState(false);

    useEffect(() => {
        setOnClient(true)
    }, [])

    const renderingGraph = ViewModel(lid)

    // For preventing SSR on Xarrow
    if (!onClient) {
        return <></>
    }

    if (renderingGraph.length === 0) {
        return <LoadingSpinner />
    }

    // Return Cluster of Course Nodes that call their children recursively 
    return (
        <>
            <motion.main
                className="flex items-center justify-center gap-10 grow"
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
                {/* HIDE Start Node */}

                <div className="flex flex-col gap-10">
                    <Xwrapper>
                        {
                            renderingGraph.map((item, index) => {
                                return (
                                    <div key={index} className="flex gap-10 items-center" >
                                        <CourseNode
                                            key={item.lessonId}
                                            {...item}
                                            setChildReady={setChildReady}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Xwrapper >
                </div >
            </motion.main >
        </>
    )
}

export default LearningNodeMap;