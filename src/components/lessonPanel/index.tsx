import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
import ViewModel from './ViewModel';
import { NodeOpenFile, NodeWithModal } from './NodeItem'

type LessonPanelProps = {
    lesson_id: string
}

const LessonPanel = ({ lesson_id }: LessonPanelProps) => {
    const { nodes, lessonName } = ViewModel(lesson_id)

    if (nodes.length === 0) {
        return <LoadingSpinner />
    }

    return (
        <div className='flex gap-x-20 justify-center mt-10'>
            <div className='flex flex-col gap-4 p-6 bg-slate-100 dark:bg-gray-normal rounded-3xl min-w-[300px]' >
                <h1 className='text-2xl p-2 font-bold text-center'>{lessonName}</h1>
                {nodes.map((node) => {
                    if (node.type === 'PDF') {
                        return (
                            <NodeOpenFile
                                key={node.id}
                                type={node.type}
                                data={node.data}
                            />
                        )
                    }
                    return (
                        <NodeWithModal
                            key={node.id}
                            type={node.type}
                            data={node.data}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default LessonPanel
