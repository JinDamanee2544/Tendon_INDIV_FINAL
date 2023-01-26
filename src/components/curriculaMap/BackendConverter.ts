import { LearningLessonNodeProps } from "../../customTypes";
import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import { action, computed, observable } from "mobx";
import React from "react";
import { getLessonInformation } from "linkWithBackend/lessonHandle/lessonData";
import prepNodeAlgo from "linkWithBackend/lessonHandle/Graph_PrepNodeData";

const dataDict: { [key: string]: Lesson } = {}
const isRender: { [key: string]: boolean } = {}
let firstCal: boolean = false
let childReady: boolean = false
let initNode: string[] = []
let prepNodePrepare: LearningLessonNodeProps = {} as LearningLessonNodeProps

export default class NewBackendConvert {
    @observable lessonArray:string[] = []
    @observable data: Lesson[] = []
    @observable lonely: string[] = []
    @observable prepArray: LearningLessonNodeProps = {} as LearningLessonNodeProps
    @observable course: Course = {} as Course

    constructor(course: Course) {
        this.course = course
        this.lessonArray = course.lessons!
    }

    @computed get getPrepArray() {
        return this.prepArray
    }

    @action
    async converter() {
        const allCoursesLoading = Promise.all(this.lessonArray?.map(async (lesson) => {
            const tmpValue = await getLessonInformation(lesson)
            dataDict[tmpValue.id] = tmpValue
            isRender[tmpValue.id] = true
            this.data.push(tmpValue)
            try {
                if (tmpValue.prevLesson.length === 0) {
                    this.lonely.push(tmpValue.id)
                }
            } catch (err) {
                console.log("Error: ", err)
            }
        }))
        await allCoursesLoading;
        initNode = this.lonely;
        firstCal = true;
        this.prepArray = prepNodeAlgo({ courseView: this.course, dataDict: dataDict, initLesson: this.lonely });
    }
}