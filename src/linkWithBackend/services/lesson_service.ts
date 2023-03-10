import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import TYPES, { Lesson } from 'linkWithBackend/interfaces/TendonType'
import APIService from './api_service'
import { LessonServiceInterface } from 'linkWithBackend/interfaces/ServiceInterface'

@injectable()
class LessonService implements LessonServiceInterface {
    response: Lesson
    status: number
    message: string
    apiService: APIService
    responseMany: Lesson[]

    constructor(
        @inject(TYPES.APIService) apiService: APIService
    ) {
        makeAutoObservable(this)
        this.apiService = apiService
        this.response = {} as Lesson
        this.status = 0
        this.message = ""
        this.responseMany = []
    }

    async postLesson(body: Lesson) {
        let bodySend:Lesson = {
                ID: "",
                Title: body.Title,
                Description: body.Description,
                Nodes: body.Nodes,
                NextLessons: body.NextLessons,
                PrevLessons: body.PrevLessons
        }

        const result = await this.apiService.post<Lesson>(
            "http://24.199.72.217:8080/api/v1/auth/lessons",
            bodySend,
        )
        this.message = result.message
        this.status = result.status
        return this.response = result.response

    }

    async getLessonById(id: string){
        var result = await this.apiService.get<Lesson>(`http://24.199.72.217:8080/api/v1/auth/lessons/${id}`)
        this.message = result.message
        this.status = result.status
        return this.response = result.response.data
    }

    async updateLesson(id: string, body: Lesson) {
        let bodySend:Lesson = {
            ID: "",
            Title: body.Title,
            Description: body.Description,
            Nodes: body.Nodes,
            NextLessons: body.NextLessons,
            PrevLessons: body.PrevLessons
        }

        const result = await this.apiService.update<Lesson>(
            "http://24.199.72.217:8080/api/v1/auth/lessons",
            bodySend,
            id,
        )
        this.message = result.message
        this.status = result.status
        return this.response = result.response
    }

    async deleteLesson(id: string) {
        return this.status = await this.apiService.delete<Lesson>("http://24.199.72.217:8080/api/v1/auth/lessons", id)
    }

    async getManyLessonByID(ids: string) {
        const result = await this.apiService.getManyByID<Lesson>("https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/lesson/lesson-id-many/"+ids)
        this.message = result.message
        this.status = result.status
        if (result.response?.lessons) {
            return this.responseMany = result.response.lessons!
        }
        return []
    }

    public getStatus() {
        return this.status
    }

    public getResponse() {
        return this.response
    }

    public getMessage() {
        return this.message
    }

}

export default LessonService