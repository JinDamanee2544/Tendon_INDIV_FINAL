import CourseNode from "@components/curriculaMap/LearningNode";
import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import React, { useEffect, useState } from "react";
import { StatusType } from "@customTypes/index";
import TopologicalSort from "./Graph_TopoHandle";
import LessonDataViewModel from "./LessonViewModel";
import { useTendonContainer } from "linkWithBackend/services/container";
import { lesson_id, token } from "../_demo_setting";
import LessonGraphService from "linkWithBackend/services/data_service";
import { LessonGetHandle } from "./LessonView";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { generateLevel } from "./Graph_LevelHandle";
import { dataPairHandle } from "./Graph_DataHandle";
import ArrowBox from "../../../components/baseComponents/ArrowBox";
import { useTheme } from "next-themes";

//@components/curriculaMap/LearningNode

interface graphProps {
    courseView: Course
}

async function getLessonInformation(lesson_id: string) {
    var result: Lesson = {} as Lesson
    var lessonGraph = new LessonGraphService()
    var lessonInformation:Lesson = await lessonGraph.getLessonById(lesson_id, token)

    result = {
        ... result,
        id: lessonInformation?.id,
        name: lessonInformation?.name,
        description: lessonInformation?.description,
        access: lessonInformation?.access,
        nodes: lessonInformation?.nodes,
        nextLesson: lessonInformation?.nextLesson,
        prevLesson: lessonInformation?.prevLesson
    }
    return result
}

export interface coordinateXY {
    levelX: number,
    levelY: number,
    direction: boolean,       // true = up, false = down
}

const DraggableBoxx = ({id, name, level} : { id: string, name: string, level: {[key: string]: coordinateXY} }) => {
    const updateXarrow = useXarrow();
    
    return (
        <Xwrapper>
            <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
                <div id = {id} className = "node-show" style= { {position: "fixed", left: (level[id!]!.levelX * 180 + 50), bottom: (level[id!]!.levelY * 50 + 520 ) } }>
                    { name }
                </div>
            </Draggable>
        </Xwrapper>
    )
}

export default function GraphPathView({ courseView } : graphProps) {
    const lessonArray = courseView.lessons
    var data: Lesson[] = []
    var lonely: string[] = []
    const { theme } = useTheme();
    const [lessonResult, setLessonResult] = useState<Lesson[]>([])
    const [topoResult, setTopoResult] = useState<string[]>([])
    const [levelResult, setLevelResult] = useState<{[key: string]: coordinateXY}>({})
    const [dataDict, setDataDict] = useState<{[key: string]: Lesson}>({})
    const [pairArray, setPairArray] = useState<string[][]>([])
    const [firstCal, setFirstCal] = useState<boolean>(false)
    const [childReady, setChildReady] = useState(false)
    const [initNode, setInitNode] = useState<string[]>([])
    
    for (let i = 0; i < lessonArray.length; i++) {
        let promise = new Promise<Lesson>((resolve, reject) => {
            const tmpValue = getLessonInformation(lessonArray[i]!)
            resolve(tmpValue)
        })
        promise.then( value => {
            // var tmp = dataDict
            dataDict[value.id] = value
            data.push(value)
            if (value.prevLesson.length === 0) {
                lonely.push(value.id)
            }
        }).then( value => {
            if (data.length === lessonArray.length && !firstCal) {
                var lessonTopoArray = TopologicalSort(data)
                // var level = generateLevel(data)
                var pairing = dataPairHandle(data)
                setLessonResult(data)
                setTopoResult(lessonTopoArray)
                // setLevelResult(level)
                setPairArray(pairing)
                setInitNode(lonely)
                setFirstCal(true)
                console.log("Dict: ", dataDict)
            }
        })
    }

    return (
        <>
            <CourseNode
                // renderId={startCourseNode.courseId} // Types require this, but it's not used
                key={courseView.id}
                lessonId={courseView.id}
                lessonName={courseView.name}
                status= {StatusType.COMPLETED}
                setChildReady={() => { }} // No Child will use this one so it's fine
                isRender={true}
            />
            {/* {lessonArray.map((lesson_id: string, index: number) => (
                <div key= {index}>
                    <LessonGetHandle lesson_id={lesson_id} />
                </div>
            ))} */}
            
            {/* <h4> Topological Sort </h4>
            {topoResult.map((lesson_id: string, index: number) => (
                <div key= {index}>
                    <p> {lesson_id} </p>
                </div>
            ))} */}
            <Xwrapper>
                {/* {topoResult.map((lessonID: string) => (
                    <div key={lessonID}>
                        <DraggableBoxx id = {lessonID} name = { dataDict[lessonID]?.name! } level = { levelResult } />
                    </div>
                ))}

                {lessonResult.map((thisNode: Lesson) => (
                    <div key = {thisNode.id} >
                        { thisNode.nextLesson.map((nextNode: string) => (
                            <div key = {thisNode.name + "-" + nextNode } className= "xarrowClass">
                                <Xarrow start = {thisNode.id} end = {nextNode} passProps= {{cursor: "pointer"}} />
                            </div>
                        ))}
                    </div>
                ))} */}

                <div className="flex flex-col gap-10">
                    <Xwrapper>
                        {topoResult.map((lesson_id, index) => {
                            return (
                                <div key={index} className="flex gap-10 items-center" >
                                    <CourseNode
                                        key={lesson_id}
                                        lessonId = {lesson_id}
                                        lessonName = {dataDict[lesson_id]?.name!}
                                        status = {StatusType.INPROGRESS}
                                        // next =  {RenderLearningLessonNodeProps[]}
                                        setChildReady = { setChildReady }
                                        isRender = { true }
                                    />
                                </div>
                            )
                        })}
                        {initNode.map((initLesson, index) => {
                            return (
                                <div key={index} className="flex gap-10 items-center" >
                                    {childReady && (
                                        <ArrowBox>
                                            <Xarrow
                                                start={ courseView.id }
                                                end={ initLesson }
                                                color={theme === 'light' ? '#475569' : '#961EFF'}
                                            />
                                        </ArrowBox>
                                    )}
                                </div>
                            )
                        })}
                        {pairArray.map((pairing, index) => {
                            return (
                                <div key={index} className="flex gap-10 items-center" >
                                    {childReady && (
                                        <ArrowBox>
                                            <Xarrow
                                                start={ pairing[0]! }
                                                end={ pairing[1]! }
                                                color={theme === 'light' ? '#475569' : '#961EFF'}
                                            />
                                        </ArrowBox>
                                    )}
                                </div>
                            )
                        })}
                    </Xwrapper >
                </div >
            </Xwrapper>

        </>
    )
}