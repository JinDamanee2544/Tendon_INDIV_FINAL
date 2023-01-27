import axios from 'axios'
import { makeAutoObservable } from "mobx"
import { injectable } from 'inversify'
import { Course } from 'linkWithBackend/interfaces/TendonType'
import TYPES from "linkWithBackend/interfaces/TendonType";
import APIService from './api_services';

@injectable()
class CourseService {
    response: Course
    status: number
    message: string

    constructor(
        /// @inject(TYPES.APIService) apiService: APIService,
    ) {
        makeAutoObservable(this)
        this.response = {} as Course
        this.status = 0
        this.message = ""
    }

    async postCourse(body: Course, token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios.post('http://24.199.72.217:8080/api/v1/auth/courses', {
            name: body.name,
            description: body.description,
            access: body.access,
            lessons: body.lessons
        }, config)
        .then((response) => {
            this.status = response.status
            this.response = response.data
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            this.response = {} as Course
        });

        return this.response
    }

    async getCourseById(id: string, token: string){
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let tmp_response: any
        try { 
            tmp_response =  await axios.get<any>(`http://24.199.72.217:8080/api/v1/auth/courses/${id}`, config)
            this.status = tmp_response.status
            this.response = tmp_response.data
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            this.response = {} as Course
        }
        return this.response
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

function inject(Weapon: any) {
    throw new Error('Function not implemented.')
}
