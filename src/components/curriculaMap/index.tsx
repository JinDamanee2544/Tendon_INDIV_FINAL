import { motion } from 'framer-motion'
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useState } from "react"
import { CourseGetHandle } from "pages/adminControl/service_page/CourseView";
import { ContainerProviderTendon } from "linkWithBackend/services/container";

interface LearningNodeMapProps {
    learningNodeData: string
}
// Entire View of the Course Map (Container)
const LearningNodeMap = ({ learningNodeData: learningNodeID }: LearningNodeMapProps) => {
    const { theme } = useTheme();
    const [childReady, setChildReady] = useState(false);
    const [onClient, setOnClient] = useState(false);
    //const mappedNodeprop = useMemo(() => prepNode(learningNodeData, setChildReady), [learningNodeData])

    useEffect(() => {
        setOnClient(true)
    }, [])

    if (!onClient) return null;

    return (
        <>
            <motion.main
                className="flex items-center justify-center gap-10"
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
                {/* Start Node */}
                <ContainerProviderTendon>
                    <CourseGetHandle
                        id={learningNodeID}
                        component={"map"}
                        key={learningNodeID}
                    />
                </ContainerProviderTendon>

                {/* <div className="flex flex-col gap-10">
                    <Xwrapper>
                        {mappedNodeprop.map((item, index) => {
                            return (
                                <div key={index} className="flex gap-10 items-center" >
                                    <CourseNode
                                        key={item.lessonId}
                                        {...item}
                                    />
                                    {
                                        childReady && (
                                            <ArrowBox>
                                                <Xarrow
                                                    start={ learningNodeData.lessonId }
                                                    end={item.lessonId.toString()}
                                                    color={theme === 'light' ? '#475569' : '#961EFF'}
                                                />
                                            </ArrowBox>
                                        )
                                    }
                                </div>
                            )
                        })}
                    </Xwrapper >
                </div > */}
            </motion.main >
        </>
    )
}

export default LearningNodeMap;