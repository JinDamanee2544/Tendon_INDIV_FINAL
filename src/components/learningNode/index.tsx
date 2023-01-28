import NodeItem from './NodeItem';
import { LearningNode } from '@customTypes/tendonAPItype';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
import Modal from './Modal';
import { resSource } from '@customTypes/index';
import { dictLesson } from "linkWithBackend/lessonHandle/lessonData";
import { Lesson, Node } from 'linkWithBackend/interfaces/TendonType';
import { ContainerProviderTendon } from 'linkWithBackend/services/container';
import { NodeGetHandle } from 'pages/adminControl/service_page/NodeView';
import { getLessonInformation } from 'linkWithBackend/lessonHandle/lessonData';

// Mock fetchings
const getResData = ({ resLink, resType }: resSource) => {
    console.log(resLink)
    switch (resType) {
        case 'textNode':
            return <p>text</p>
        default:
            return <p>no data</p>
    }
}

type LessonNodeDataProps = {
    lesson_id: string
}

const LessonNode = ({ lesson_id }: LessonNodeDataProps) => {

    const [isOpened, setIsOpened] = useState(false)
    const [resSource, setResSource] = useState<resSource>({ resLink: '', resType: '' })
    const [modalData, setModalData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)   // mock loading
    const [nodeArray, setNodeArray] = useState<string[]>([])

    useEffect(() => {
        if (isOpened) {
            setModalData(getResData(resSource))
        }
    }, [isOpened, resSource])

    useEffect(() => {
        let promise = new Promise<Lesson>((resolve, reject) => {
            const tmpValue = getLessonInformation(lesson_id)
            resolve(tmpValue)
        })
        promise.then( value => {
            setNodeArray(value.nodes)
        })

    }, [])
   
    // console.log(nodeArray)
    while (nodeArray === undefined) {

    }
    return (
        <>
            {
                isLoading ? <LoadingSpinner /> :
                    <>
                        {
                            <div className='flex gap-x-20 justify-center mt-10'>
                                <div className='flex flex-col gap-4 p-6 bg-slate-100 dark:bg-gray-normal rounded-3xl  min-w-[300px]'                    >
                                    {/* <h1 className='text-2xl p-2 font-bold text-center'>{LearningNodeData.attributes?.learningNodeName}</h1>
                                    {
                                        LearningNodeData.attributes?.subNode && LearningNodeData.attributes?.subNode.map((node, index) => {
                                            // ********* 
                                            return (
                                                <NodeItem
                                                    key={index}
                                                    type={node.type}
                                                    name={node.name}
                                                    attributes={node.attributes}
                                                    id={node.id}
                                                    setIsOpened={setIsOpened}
                                                    setResSource={setResSource}
                                                />
                                            )
                                        })
                                    } */}
                                    <h1 className='text-2xl p-2 font-bold text-center'> File~~~ </h1>
                                    {nodeArray!== undefined && nodeArray.map((nodeId, index) => {
                                        return (
                                            <div key={index} className="flex gap-10 items-center" >
                                                <ContainerProviderTendon>
                                                    < NodeGetHandle node_id = { nodeId } setIsOpened = {setIsOpened} setResSource = {setResSource} />
                                                </ContainerProviderTendon>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        {   // Modal
                            isOpened && modalData && (
                                <Suspense fallback={<LoadingSpinner />}>
                                    <Modal
                                        setIsOpened={setIsOpened}
                                        showData={modalData}
                                    />
                                </Suspense>
                            )
                        }
                    </>
            }
        </>

    )
}

export default LessonNode