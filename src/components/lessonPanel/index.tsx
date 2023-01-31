import { useState } from 'react';
import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
// import Modal from './Modal';
import { resSource } from '@customTypes/index';
import NodeItem from './NodeItem';
import ViewModel from './ViewModel';

type LessonPanelProps = {
    lesson_id: string
}

const LessonPanel = ({ lesson_id }: LessonPanelProps) => {
    const [resSource, setResSource] = useState<resSource>({ resLink: '', resType: '' })
    const { nodes, lessonName } = ViewModel(lesson_id)

    // const [isOpened, setIsOpened] = useState(false)
    // const [modalData, setModalData] = useState<any>(null)
    // const [isLoading, setIsLoading] = useState(false)   // mock loading

    // useEffect(() => {
    //     if (isOpened) {
    //         setModalData(getResData(resSource))
    //     }
    // }, [isOpened, resSource])

    if (nodes.length === 0) {
        return <LoadingSpinner />
    }

    return (
        <>
            <div className='flex gap-x-20 justify-center mt-10'>
                <div className='flex flex-col gap-4 p-6 bg-slate-100 dark:bg-gray-normal rounded-3xl min-w-[300px]' >
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
                </div>
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

export default LessonPanel
