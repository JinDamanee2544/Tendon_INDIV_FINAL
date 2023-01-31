import CourseNode from "@components/courseMap/LearningNode";
import TYPES, { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import React, { useMemo, useState } from "react";
import { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { useTheme } from "next-themes";
import { prepNode } from "../../components/courseMap/LeaningNodeViewModel";
import { LearningLessonNodeProps } from "../../customTypes"
import prepNodeAlgo from "../../linkWithBackend/lessonHandle/Graph_PrepNodeData";
import { motion } from "framer-motion";
import { getLessonInformation } from "../../linkWithBackend/lessonHandle/lessonData"
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_services";

interface graphProps {
    courseView: Course
}

export interface coordinateXY {
    levelX: number,
    levelY: number,
    direction: boolean,       // true = up, false = down
}

const memService = container.get<MemoryService>(TYPES.MemoryService)
var token = memService.getToken()
const DraggableBoxx = ({ id, name, level }: { id: string, name: string, level: { [key: string]: coordinateXY } }) => {
    const updateXarrow = useXarrow();

    return (
        <Xwrapper>
            <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
                <div id={id} className="node-show" style={{ position: "fixed", left: (level[id!]!.levelX * 180 + 50), bottom: (level[id!]!.levelY * 50 + 520) }}>
                    {name}
                </div>
            </Draggable>
        </Xwrapper>
    )
}

export default function GraphPathView({ courseView }: graphProps) {
    const lessonArray = courseView.lessons
    var data: Lesson[] = []
    var lonely: string[] = []
    var prepArray: LearningLessonNodeProps = {} as LearningLessonNodeProps

    const { theme } = useTheme();
    const [dataDict, setDataDict] = useState<{ [key: string]: Lesson }>({})
    const [isRender, setIsRender] = useState<{ [key: string]: boolean }>({})
    const [firstCal, setFirstCal] = useState<boolean>(false)
    const [childReady, setChildReady] = useState(false)
    const [initNode, setInitNode] = useState<string[]>([])
    const [prepNodePrepare, setPrepNodePrepare] = useState<LearningLessonNodeProps>({} as LearningLessonNodeProps)

    for (let i = 0; i < lessonArray.length; i++) {
        let promise = new Promise<Lesson>((resolve, reject) => {
            const tmpValue = getLessonInformation(lessonArray[i]!)
            resolve(tmpValue)
        })
        promise.then(value => {
            // var tmp = dataDict
            dataDict[value.id] = value
            isRender[value.id] = true
            data.push(value)
            try {
                if (value.prevLesson.length === 0) {
                    lonely.push(value.id)
                }
            } catch (err) {
                // console.log("--> ", value)
            }

        }).then(value => {
            if (data.length === lessonArray.length && !firstCal) {
                setInitNode(lonely)
                setFirstCal(true)
                prepArray = prepNodeAlgo({ courseView: courseView, dataDict: dataDict, initLesson: lonely })
                setPrepNodePrepare(prepArray)
            }
        })
    }

    // useEffect(() => {
    //     for (let e in isRender) {
    //         isRender[e] = true
    //     }
    // }, [dataDict, firstCal, childReady, initNode])

    const mappedNodeprop = useMemo(() => prepNode(prepNodePrepare, setChildReady), [prepNodePrepare])

    return (
        <>
            {/* 
                first Node do not render!
            */}

            <motion.main
                className="flex items-center justify-center gap-10"
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
                <div className="flex flex-col gap-10">
                    <Xwrapper>
                        {mappedNodeprop.map((item, index) => {
                            return (
                                <div key={index} className="flex gap-10 items-center" >
                                    <CourseNode
                                        key={item.lessonId}
                                        {...item}
                                    />
                                    {/* 
                                        firstNode do not connect the line!
                                    */}
                                </div>
                            )
                        })}
                    </Xwrapper >
                </div >
            </motion.main >
        </>
    )
}
