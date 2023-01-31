import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
import { motion } from 'framer-motion'
import React, { useEffect, useState } from "react"
import { Xwrapper } from 'react-xarrows';
import CourseNode from './LearningNode';
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

    if (renderingGraph.length === 0) {
        return <LoadingSpinner />
    }

    // For preventing SSR on Xarrow
    if (!onClient) {
        return <></>
    }

    return (
        <>
            <motion.main
                className="flex items-center justify-center gap-10"
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