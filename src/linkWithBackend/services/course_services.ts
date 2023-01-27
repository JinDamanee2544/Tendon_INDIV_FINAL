import axios from 'axios'
import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import { Course } from 'linkWithBackend/interfaces/TendonType'
import TYPES from "linkWithBackend/interfaces/TendonType";
import APIService from './api_services';

@injectable()
class CourseService {
    response: Course
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
    }

    async postCourse(body: Course, token: string) {
        let bodySend:Course = {
            id: "",
            name: body.name,
            description: body.description,
            access: body.access,
            lessons: body.lessons
        }

        const result = await this.apiService.post<Course>(
            "http://24.199.72.217:8080/api/v1/auth/courses",
            bodySend,
            token
        )
        this.message = result.message
        this.status = result.status
        return this.response = result.response
    }

    async getCourseById(id: string, token: string){
        return this.response = await this.apiService.getByID<Course>("http://24.199.72.217:8080/api/v1/auth/courses", id, token)
    }

    async updateCourse(id: string, token: string, body: Course) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try { 
            await axios.patch(`http://24.199.72.217:8080/api/v1/auth/courses/${id}`, {
                name: body.name,
                description: body.description,
                access: body.access,
                createBy: body.createBy,
                lessons: body.lessons
            }, config)
            .then((res) => {
                this.status = res.status
                this.response = res.data
            })
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            this.response = {} as Course
        }
        return this.response
    }

    async deleteCourse(id: string, token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await axios.delete(`http://24.199.72.217:8080/api/v1/auth/courses/${id}`, config)
            .then((res) => {
                this.status = res.status
            })
        } catch(err) {
            this.status = Object(err)["response"]["request"]["status"]
        }
        return this.status
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
