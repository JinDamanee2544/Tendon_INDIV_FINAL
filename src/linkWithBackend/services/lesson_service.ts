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

    constructor(
        @inject(TYPES.APIService) apiService: APIService
    ) {
        makeAutoObservable(this)
        this.apiService = apiService
        this.response = {} as Lesson
        this.status = 0
        this.message = ""
    }

    async postLesson(body: Lesson) {
        let bodySend:Lesson = {
                id: "",
                name: body.name,
                description: body.description,
                access: body.access,
                nodes: body.nodes,
                nextLesson: body.nextLesson,
                prevLesson: body.prevLesson
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
        return this.response = result.response
    }

    async updateLesson(id: string, body: Lesson) {
        let bodySend:Lesson = {
            id: "",
            name: body.name,
            description: body.description,
            access: body.access,
            nodes: body.nodes,
            nextLesson: body.nextLesson,
            prevLesson: body.prevLesson
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