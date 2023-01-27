import axios from 'axios'
import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import TYPES, { Lesson } from 'linkWithBackend/interfaces/TendonType'
import APIService from './api_services'

@injectable()
class LessonService {
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

    async postLesson(body: Lesson, token: string) {
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
            token
        )
        this.message = result.message
        this.status = result.status
        return this.response = result.response

    }

    async getLessonById(id: string, token: string){
        return this.response = await this.apiService.getByID<Lesson>("http://24.199.72.217:8080/api/v1/auth/lessons", id, token)
    }

    async updateLesson(id: string, token: string, body: Lesson) {
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
            token
        )
        this.message = result.message
        this.status = result.status
        return this.response = result.response
    }

    async deleteLesson(id: string, token: string) {
        return this.status = await this.apiService.delete<Lesson>("http://24.199.72.217:8080/api/v1/auth/lessons", id, token)
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