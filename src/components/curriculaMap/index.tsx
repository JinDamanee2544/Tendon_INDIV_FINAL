import { motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from "react"
import { Xwrapper } from 'react-xarrows';
import CourseNode from './LearningNode';
import { RenderLearningLessonNodeProps } from '@customTypes/index';
import useCurriculaMapViewModel from './viewmodel';
import { observer } from 'mobx-react';

interface LearningNodeMapProps {
    lid: string
}
// Entire View of the Course Map (Container)
const LearningNodeMap = ({ lid }: LearningNodeMapProps) => {
    const [childReady, setChildReady] = useState(false);
    const [onClient, setOnClient] = useState(false);
    //const mappedNodeprop = useMemo(() => prepNode(lid, setChildReady), [lid])

    /*

    const container = useTendonContainer()

    const courseService = container.get<CourseService>(TYPES.CourseService)

    courseService.

    const viewModel = new CourseDataViewModel(useTendonContainer())

    viewModel.

    */

    const renderingGraph = useCurriculaMapViewModel(lid)

    useEffect(() => {
        setOnClient(true)
        console.log(renderingGraph)
    }, [])

    if (!onClient) return null;

    return (
        <>
            <motion.main
                className="flex items-center justify-center gap-10"
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
                {/* HIDE Start Node */}
                {
                    /* <CourseGetHandle
                        id={learningNodeID}
                        component={"map"}
                        key={learningNodeID}
                    /> */
                }

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