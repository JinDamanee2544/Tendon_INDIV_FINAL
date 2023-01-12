import CourseNode from "@components/curriculaMap/LearningNode";
import { Course } from "linkWithBackend/interfaces/TendonType";
import React from "react";
import { StatusType } from "@customTypes/index";

interface graphProps {
    courseView: Course
}

export default function GraphPathView({ courseView } : graphProps) {
    const lessonArray = courseView.lessons
    return (
        <>
            <CourseNode
                // renderId={startCourseNode.courseId} // Types require this, but it's not used
                key={courseView.id}
                lessonId={courseView.id}
                lessonName={courseView.name}
                status= {StatusType.NOTSTARTED}
                setChildReady={() => { }} // No Child will use this one so it's fine
                isRender={true}
            />

            {/* <div className="flex flex-col gap-10">
                <Xwrapper>
                    {mappedNodeprop.map((item, index) => {
                        return (
                            <div key={index} className="flex gap-10 items-center" >
                                <CourseNode
                                    key={item.lessonId}
                                    {...item}
                                />
                                {
                                    childReady && (
                                        <ArrowBox>
                                            <Xarrow
                                                start={ learningNodeData.lessonId }
                                                end={item.lessonId.toString()}
                                                color={theme === 'light' ? '#475569' : '#961EFF'}
                                            />
                                        </ArrowBox>
                                    )
                                }
                            </div>
                        )
                    })}
                </Xwrapper >
            </div > */}
        </>
    )
}