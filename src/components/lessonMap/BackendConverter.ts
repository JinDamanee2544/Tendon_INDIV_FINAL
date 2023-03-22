import { LearningLessonNodeProps } from "types";
import TYPES, { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import { action, computed, observable } from "mobx";
import prepNodeAlgo from "linkWithBackend/lessonHandle/Graph_PrepNodeData";
import container from "linkWithBackend/services/inversify.config";
import LessonService from "linkWithBackend/services/lesson_service";
import ProgressService from "linkWithBackend/services/progress_service";

const dataDict: { [key: string]: Lesson } = {}
const lessonProgressDict: { [key: string]: number } = {}
let firstCal: boolean = false
let initNode: string[] = []

interface converterPromiseInterface {
    allLesson: Lesson[],
    allProgress: number[]
}

export default class NewBackendConvert {
    @observable lessonIdArray: string[] = []
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
        const allCoursesLoading = new Promise<converterPromiseInterface>((resolve, reject) => {
            const lessonService = container.get<LessonService>(TYPES.LessonService)
            let tmpValue: Lesson[] = []
            let tmpProgress: number[] = []
            const getAllLessonInformation = async () => {
                tmpValue = await lessonService.getManyLessonByID(this.course.ID, this.lessonIdArray.toString())
                const progressService = container.get<ProgressService>(TYPES.ProgressService)
                for (let i = 0; i < this.lessonIdArray.length; i++) {
                    const result = await progressService.getLessonsProgress(this.lessonIdArray[i]!, this.course.ID)
                    tmpProgress.push(result.progress)
                }
                resolve({
                    allLesson: tmpValue,
                    allProgress: tmpProgress
                })
            }
            getAllLessonInformation()
        })
        allCoursesLoading.then(({allLesson, allProgress}: converterPromiseInterface) => {
            allLesson.forEach((lesson: Lesson) => {
                dataDict[lesson.ID] = lesson
                lessonProgressDict[lesson.ID] = allProgress[this.lessonIdArray.indexOf(lesson.ID!)]!

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
        this.prepArray = prepNodeAlgo({ courseView: this.course, dataDict: dataDict, lessonProgressDict: lessonProgressDict ,initLesson: this.lonely })
    }
}