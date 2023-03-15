import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import { LearningLessonNodeProps, StatusType } from "../../types"

interface prepAlgoInterface {
    courseView: Course
    dataDict: { [key: string]: Lesson }
    initLesson: string[]
}
let dict: { [key: string]: Lesson }

function recursive(nextIdArray: string[]) {
    if (nextIdArray.length == 0) {
        return []
    }
    let tmp: LearningLessonNodeProps[] = []
    for (let i = 0; i < nextIdArray.length; i++) {
        let myLessonID = nextIdArray[i]
        try {
            tmp.push({
                lessonId: dict[myLessonID!]!.ID,
                lessonName: dict[myLessonID!]!.Title,
                status: StatusType.COMPLETED,                  // TODO: change to real status                 
                next: recursive(dict[myLessonID!]!.NextLessons)
            })
        } catch (err) {
            console.log(err + "==> " + myLessonID)
        }

    }
    return tmp
}

export default function prepNodeAlgo(props: prepAlgoInterface) {
    dict = props.dataDict

    // start node is just a dummy node :P, so we can put any value in it
    let tmp = {
        lessonId: props.courseView.ID,
        lessonName: props.courseView.Title,
        status: StatusType.INPROGRESS,
        next: recursive(props.initLesson)
    }
    return tmp
}