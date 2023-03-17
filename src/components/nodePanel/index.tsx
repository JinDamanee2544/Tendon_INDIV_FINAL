import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
import ViewModel from './ViewModel';
import NodeMUX, { NodeType } from './NodeMUX';
import { NodeWithProgress } from 'types';

type LessonPanelProps = {
    lesson_id: string
    course_id: string
}

const initialProgress = 20 // just for display purposes
const mockText = `default text file (in this case, it's not a pdf file)`

const LessonPanel = ({ lesson_id, course_id }: LessonPanelProps) => {

    const { nodesWithProgress, lessonName, lessonProgress } = ViewModel({ lesson_id, course_id })


    if (nodesWithProgress.length === 0) {
        return <LoadingSpinner />
    }

    return (
        <div className='mt-10 flex justify-center gap-x-20'>
            <div className='flex min-w-[300px] flex-col gap-4 rounded-3xl bg-slate-100 p-6 dark:bg-gray-normal' >
                <h1 className='p-2 text-center text-2xl font-bold'>{lessonName}</h1>
                <progress data-theme='tendon' className="progress progress-primary" value={lessonProgress || 20} max="100"></progress>

                {nodesWithProgress.map((node: NodeWithProgress) => {
                    return (
                        <NodeMUX
                            name={node.Title}
                            key={node.ID}
                            FileType={NodeType.pdfNode}
                            Data={node.Data}
                            ID={node.ID}
                            Title={node.Title}
                            Description={node.Description}
                            progress={node.progress || 0}
                        />
                    )
                })}

                {/* Mock */}
                {
                    <NodeMUX
                        name={'test-sound'}
                        key={'test-sound'}
                        FileType={NodeType.soundNode}
                        Data={'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
                        ID={'test-sound'}
                        Title={'sound title'}
                        Description={'sound description'}
                        progress={100}
                    />
                }
                {
                    <NodeMUX
                        name={'test-text'}
                        key={'test-text'}
                        FileType={NodeType.textNode}
                        Data={mockText}
                        ID={'test-text'}
                        Title={'text title'}
                        Description={'text description'}
                        progress={20}
                    />
                }
                {
                    <NodeMUX
                        name={'test-video'}
                        key={'test-video'}
                        FileType={NodeType.videoNode}
                        Data={'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
                        ID={'test-video'}
                        Title={'video title'}
                        Description={'video description'}
                        progress={70}
                    />
                }
            </div>
        </div>
    )
}

export default LessonPanel
