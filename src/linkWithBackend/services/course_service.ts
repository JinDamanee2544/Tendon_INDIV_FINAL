import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import { Course } from 'linkWithBackend/interfaces/TendonType'
import TYPES from "linkWithBackend/interfaces/TendonType";
import APIService from './api_service';
import { CourseServiceInterface } from 'linkWithBackend/interfaces/ServiceInterface';

@injectable()
class CourseService implements CourseServiceInterface {
    response: Course
    responseMany: Course[]
    status: number
    message: string
    apiService: APIService

    constructor(
        @inject(TYPES.APIService) apiService: APIService
    ) {
        makeAutoObservable(this)
        this.apiService = apiService
        this.response = {} as Course
        this.status = 0
        this.message = ""
        this.responseMany = []
    }

    async postCourse(body: Course) {
        let bodySend:Course = {
            ID: "",
            Title: body.Title,
            Description: body.Description,
            Access: body.Access,
            Lessons: body.Lessons
        }

        const result = await this.apiService.post<Course>(
            "http://24.199.72.217:8080/api/v1/auth/courses",
            bodySend,
        )
        this.message = result.message
        this.status = result.status
        return this.response = result.response.data
    }

    async getCourseById(id: string){
        let result = await this.apiService.get<Course>(`https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/course/${id}`)
        this.message = result.message
        this.status = result.status
        return this.response = result.response.course!
    }

    async updateCourse(id: string, body: Course) {
        let bodySend:Course = {
            ID: "",
            Title: body.Title,
            Description: body.Description,
            Access: body.Access,
            CreateBy: body.CreateBy,
            Lessons: body.Lessons
        }

        const result = await this.apiService.update<Course>(
            "http://24.199.72.217:8080/api/v1/auth/courses",
            bodySend,
            id,
        )
        this.message = result.message
        this.status = result.status
        return this.response = result.response
    }

    async deleteCourse(id: string) {
        return this.status = await this.apiService.delete<Course>("http://24.199.72.217:8080/api/v1/auth/courses", id)
    }

    async getManyCourseByID(ids: string) {
        const result = await this.apiService.getManyByID<Course>("https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/course/course-id-many/"+ ids.toString())
        this.message = result.message
        this.status = result.status
        return this.responseMany = result.response.courses!
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

export default CourseService
