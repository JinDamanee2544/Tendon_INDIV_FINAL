import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import { LearningLessonNodeProps, StatusType } from "../../types"

interface prepAlgoInterface {
    courseView: Course
    dataDict: { [key: string]: Lesson }
    lessonProgressDict: { [key: string]: number }
    initLesson: string[]
}
let dict: { [key: string]: Lesson }
let dictLessonProgress: { [key: string]: number }

function recursive(nextIdArray: string[], courseID: string) {
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
                // var variable = (condition) ? (true block) : ((condition2) ? (true block2) : (else block2))
                status: dictLessonProgress[myLessonID!] === 100 ? StatusType.COMPLETED : dictLessonProgress[myLessonID!] === 0 ? StatusType.NOTSTARTED : StatusType.INPROGRESS ,
                next: recursive(dict[myLessonID!]!.NextLessons, courseID)
            })
        } catch (err) {
            console.log(err + "==> " + myLessonID)
        }
    }
    return tmp
}

export default function prepNodeAlgo(props: prepAlgoInterface) {
    dict = props.dataDict
    dictLessonProgress = props.lessonProgressDict

    // start node is just a dummy node :P, so we can put any value in it (not used for now)
    let tmp = {
        lessonId: props.courseView.ID,
        lessonName: props.courseView.Title,
        status: StatusType.NOTSTARTED,
        next: recursive(props.initLesson, props.courseView.ID)
    }
    // console.log("tmp is ", tmp)
    return tmp
}