import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
import ViewModel from './ViewModel';
import NodeMUX, { NodeType } from './NodeMUX';

type LessonPanelProps = {
    lesson_id: string
}

const mockText = `default text file (in this case, it's not a pdf file)`

const LessonPanel = ({ lesson_id }: LessonPanelProps) => {
    const { nodes, lessonName } = ViewModel(lesson_id)

    if (nodes.length === 0) {
        return <LoadingSpinner />
    }

    return (
        <div className='mt-10 flex justify-center gap-x-20'>
            <div className='flex min-w-[300px] flex-col gap-4 rounded-3xl bg-slate-100 p-6 dark:bg-gray-normal' >
                <h1 className='p-2 text-center text-2xl font-bold'>{lessonName}</h1>
                {nodes.map((node) => {
                    return (
                        <NodeMUX
                            name={node.data}
                            key={node.id}
                            type={NodeType.pdfNode}
                            data={'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}
                        />
                    )
                })}
                {
                    <NodeMUX
                        name={'test-sound'}
                        key={'test-sound'}
                        type={NodeType.soundNode}
                        data={'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
                    />
                }
                {
                    <NodeMUX
                        name={'test-text'}
                        key={'test-text'}
                        type={NodeType.textNode}
                        data={mockText}
                    />
                }
                {
                    <NodeMUX
                        name={'test-video'}
                        key={'test-video'}
                        type={NodeType.videoNode}
                        data={'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
                    />
                }

            </div>
        </div>
    )
}

export default LessonPanel
