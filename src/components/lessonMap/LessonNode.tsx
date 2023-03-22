import { useEffect, useState } from 'react'
import { Xwrapper } from 'react-xarrows'
import Xarrow from 'react-xarrows'
import { useTheme } from 'next-themes'
import { RenderLearningLessonNodeProps } from 'types'
import ArrowBox from '../baseComponents/ArrowBox'
import LessonNodeView from '@components/lessonMap/LessonNodeView'

const LessonNode = (props: RenderLearningLessonNodeProps) => {
    const { lessonId, lessonName, isRender, status, next, setChildReady } = props;
    const { theme } = useTheme();
    const [subChildReady, setSubChildReady] = useState(false);

    useEffect(() => {
        setTimeout(() => setChildReady(true), 200);
    }, [setChildReady])

    return (
        <>
            {/* This Course */}
            <LessonNodeView
                lessonId={lessonId}
                lessonName={lessonName}
                isRender={isRender}
                status={status}
            />

            {/* Next Course */}
            <div className="flex flex-col gap-10">
                <Xwrapper>
                    {
                        next?.map((item, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                    <LessonNode
                                        key={item.lessonId}
                                        {...item}
                                        setChildReady={setSubChildReady}
                                    />
                                    <ArrowBox>
                                        {subChildReady &&
                                            <Xarrow
                                                start={lessonId.toString()}
                                                end={item.lessonId.toString()}
                                                color={theme === 'light' ? '#475569' : '#961EFF'}
                                            />
                                        }
                                    </ArrowBox>
                                </div>
                            )
                        })
                    }
                </Xwrapper>
            </div>
        </>
    );
}
export default LessonNode;