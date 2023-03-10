import { LearningLessonNodeProps } from "../../types";
import TYPES, { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import { action, computed, observable } from "mobx";
import { getLessonInformation } from "linkWithBackend/lessonHandle/lessonData";
import prepNodeAlgo from "linkWithBackend/lessonHandle/Graph_PrepNodeData";
import container from "linkWithBackend/services/inversify.config";
import LessonService from "linkWithBackend/services/lesson_service";

const dataDict: { [key: string]: Lesson } = {}
const isRender: { [key: string]: boolean } = {}
let firstCal: boolean = false
let childReady: boolean = false
let initNode: string[] = []
let prepNodePrepare: LearningLessonNodeProps = {} as LearningLessonNodeProps

export default class NewBackendConvert {
    @observable lessonIdArray:string[] = []
    @observable data: Lesson[] = []
    @observable lonely: string[] = []
    @observable prepArray: LearningLessonNodeProps = {} as LearningLessonNodeProps
    @observable course: Course = {} as Course

    constructor(course: Course) {
        this.course = course
        this.lessonIdArray = course.Lessons!
    }

    @computed get getPrepArray() {
        return this.prepArray
    }

    @action
    async converter() {
        const allCoursesLoading = new Promise<Lesson[]>((resolve, reject) => {
            const lessonService = container.get<LessonService>(TYPES.LessonService)
            let tmpValue: Lesson[] = []
            const getAllLessonInformation =async () => {
                tmpValue = await lessonService.getManyLessonByID(this.course.ID, this.lessonIdArray.toString())  
                resolve(tmpValue)
            }
            getAllLessonInformation()
        })
        allCoursesLoading.then((res: Lesson[]) => {
            res.forEach((lesson: Lesson) => {
                dataDict[lesson.ID] = lesson
                isRender[lesson.ID!] = true
                this.data.push(lesson)
                try {
                    if (lesson.PrevLessons.length === 0) {
                        this.lonely.push(lesson.ID!)
                    }
                } catch (err) {
                    console.log("Error: ", err)
                }
            })
        })
        await allCoursesLoading
        initNode = this.lonely;
        firstCal = true;
        this.prepArray = prepNodeAlgo({ courseView: this.course, dataDict: dataDict, initLesson: this.lonely })
    }
}