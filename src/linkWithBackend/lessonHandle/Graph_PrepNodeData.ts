import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import React from "react";
import { LearningLessonNodeProps, StatusType } from "../../customTypes"

interface prepAlgoInterface {
    courseView: Course
    dataDict: { [key: string]: Lesson }
    initLesson: string[]
}
var dict: { [key: string]: Lesson }

function recursive(nextIdArray: string[]) {
    // console.log("call: ", nextIdArray)
    if (nextIdArray.length == 0) {
        return []
    }
    var tmp: LearningLessonNodeProps[] = []
    for (let i = 0; i < nextIdArray.length; i++) {
        var myLessonID = nextIdArray[i]
        try {
            tmp.push({
                lessonId: dict[myLessonID!]!.id,
                lessonName: dict[myLessonID!]!.name,
                status: StatusType.INPROGRESS,                  // TODO: change to real status                 
                next: recursive(dict[myLessonID!]!.nextLesson)
            })
        } catch (err) {
            console.log(err + "==> " + myLessonID)
        }

    }
    return tmp
}

export default function prepNodeAlgo(props: prepAlgoInterface) {
    // let promise = new Promise<LearningLessonNodeProps>((resolve, reject) => {
    //     dict = props.dataDict
    // })
    // console.log(props)
    dict = props.dataDict
    var tmp = {
        lessonId: props.courseView.id,
        lessonName: props.courseView.name,
        status: StatusType.INPROGRESS,
        next: recursive(props.initLesson)
    }
    // console.log("output: ", tmp)
    return tmp
}