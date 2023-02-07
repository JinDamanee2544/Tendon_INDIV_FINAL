import { useEffect, useState } from 'react'
import { Xwrapper } from 'react-xarrows'
import Xarrow from 'react-xarrows'
import { useTheme } from 'next-themes'
import { RenderLearningLessonNodeProps } from '../../customTypes'
import ArrowBox from '../baseComponents/ArrowBox'
import LessonNodeView from '@components/baseComponents/LessonNodeView'

const LessonNode = ({ lessonId: courseId, lessonName: courseName, next, setChildReady, isRender, status }: RenderLearningLessonNodeProps) => {
    const { theme } = useTheme();
    const [subChildReady, setSubChildReady] = useState(false);

    useEffect(() => {
        setTimeout(() => setChildReady(true), 200);
    }, [setChildReady])

    return (
        <>
            {/* This Course */}
            <LessonNodeView
                courseId={courseId}
                courseName={courseName}
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
                                                start={courseId.toString()}
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