import { makeAutoObservable } from "mobx"

import { Container } from "inversify";
import TYPES, { Lesson } from 'linkWithBackend/interfaces/TendonType'
import LessonService from "linkWithBackend/services/lesson_services";

class LessonDataViewModel{
    private LessonService: LessonService 
    private lesson: Lesson
    private status: Number
    private message: string

    constructor(container: Container) {
        makeAutoObservable(this)
        this.LessonService = container.get<LessonService>(TYPES.LessonService)
        this.lesson = {} as Lesson
        this.status = 0
        this.message = ''
    }
    
    async createLesson(body: Lesson, token: string) {
        const tmpValue =  await this.LessonService.postLesson(body, token)
        this.status = this.LessonService.getStatus()
        if (this.status === 201) {
            this.lesson = tmpValue
            return this.lesson
        } else {
            this.handleErrorStatus()
        }
        return {} as Lesson
    }

    async getLessonData(id: string, token: string) {
        const tmpValue =  await this.LessonService.getLessonById(id, token)
        this.status = this.LessonService.getStatus()
        if (this.status === 200) {
            this.lesson = tmpValue
            return this.lesson
        } else {
            this.handleErrorStatus()
        }
        return {} as Lesson
    }

    async updateLessonData(id: string, token: string, body: Lesson) {
        const tmpValue =  await this.LessonService.updateLesson(id, token, body)
        this.status = this.LessonService.getStatus()
        if (this.status === 200) {
            this.lesson = tmpValue
            return this.lesson
        } else {
            this.handleErrorStatus()
        }
        return {} as Lesson
    }

    async deleteLesson(id: string, token: string) {
        const status =  await this.LessonService.deleteLesson(id, token)
        this.status = status
        if (this.status === 200) {
            return this.status 
        } else {
            this.handleErrorStatus()
            return this.status
        }
    }

    public getLesson() {
        return this.lesson
    }

    public getStatus() {
        return this.status
    }

    public getMessage() {
        return this.message
    }

    private handleErrorStatus() {
        if (this.status === 400) {
            this.message = "some field not exit --> " + this.LessonService.getMessage()
        } else if (this.status === 401) {
            this.message = "Unauthorized"
        } else if (this.status === 404) {
            this.message = "Doesn't have this ID"
        } else if (this.status === 406) {
            this.message = "406"
        } else if (this.status === 409) {
            this.message = "Token for Authorized Expired"
        } else {
            this.message = "Internal Error"
        }
    }

}

export default LessonDataViewModel