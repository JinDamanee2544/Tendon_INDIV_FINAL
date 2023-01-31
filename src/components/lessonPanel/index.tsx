import { Children, useState } from 'react';
import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
import Modal from './Modal';
import { resSource } from '@customTypes/index';
import NodeItem from './NodeItem';
import ViewModel from './ViewModel';

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

type PanelContainerProps = {
    children: React.ReactNode
}

const PanelContainer = ({ children }: PanelContainerProps) => {
    return (
        <div className='flex flex-col gap-4 p-6 bg-slate-100 dark:bg-gray-normal rounded-3xl  min-w-[300px]' >
            {children}
        </div>
    )
}

const LessonNode = ({ lesson_id }: LessonNodeDataProps) => {
    const [resSource, setResSource] = useState<resSource>({ resLink: '', resType: '' })
    const { nodes, lessonName } = ViewModel(lesson_id)
    // const [nodeArray, setNodeArray] = useState<string[]>([])

    // const [isOpened, setIsOpened] = useState(false)
    // const [modalData, setModalData] = useState<any>(null)
    // const [isLoading, setIsLoading] = useState(false)   // mock loading

    // useEffect(() => {
    //     if (isOpened) {
    //         setModalData(getResData(resSource))
    //     }
    // }, [isOpened, resSource])

    // useEffect(() => {
    //     let LessonLoading = new Promise<Lesson>((resolve, reject) => {
    //         const tmpValue = getLessonInformation(lesson_id)
    //         resolve(tmpValue)
    //     })
    //     LessonLoading.then(value => {
    //         setNodeArray(value.nodes)
    //     })
    // }, [lesson_id])

    if (nodes.length === 0) {
        return <LoadingSpinner />
    }

    return (
        <>
            <div className='flex gap-x-20 justify-center mt-10'>
                <PanelContainer>
                    <h1 className='text-2xl p-2 font-bold text-center'>{lessonName}</h1>
                    {nodes.map((node, index) => {
                        return (
                            <NodeItem
                                key={index}
                                type={node.type}
                                name={node.data}
                                attributes={
                                    { priority: "require", size: 9, resources: "www.google.com" }
                                }
                                id={node.id}
                                setIsOpened={() => false}
                                setResSource={setResSource}
                            />
                        )
                    })}
                    {/* <h1 className='text-2xl p-2 font-bold text-center'> File~~~ </h1>
                    {nodeArray !== undefined && nodeArray.map((nodeId, index) => {
                        return (
                            <div key={index} className="flex gap-10 items-center" >
                                < NodeGetHandle node_id={nodeId} setIsOpened={setIsOpened} setResSource={setResSource} />
                            </div>
                        )
                    })} */}
                </PanelContainer>
            </div>
            {/* 
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
            */}
        </>
    )
}

export default LessonNode