import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import { LearningLessonNodeProps, StatusType } from "../../types"

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
                lessonId: dict[myLessonID!]!.ID,
                lessonName: dict[myLessonID!]!.Title,
                status: StatusType.INPROGRESS,                  // TODO: change to real status                 
                next: recursive(dict[myLessonID!]!.NextLessons)
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
        lessonId: props.courseView.ID,
        lessonName: props.courseView.Title,
        status: StatusType.INPROGRESS,
        next: recursive(props.initLesson)
    }
    // console.log("output: ", tmp)
    return tmp
}