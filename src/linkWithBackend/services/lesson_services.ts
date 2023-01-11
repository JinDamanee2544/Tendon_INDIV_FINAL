import axios from 'axios'
import { makeAutoObservable } from "mobx"
import { injectable } from 'inversify'
import { Lesson } from 'linkWithBackend/interfaces/TendonType'

@injectable()
class LessonService {
    response: Lesson
    status: number
    message: string

    constructor() {
        makeAutoObservable(this)
        this.response = {} as Lesson
        this.status = 0
        this.message = ""
    }

    async postLesson(body: Lesson, token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios.post('http://24.199.72.217:8080/api/v1/auth/lessons', {
            name: body.name,
            description: body.description,
            access: body.access,
            nodes: body.nodes,
            nextLesson: body.nextLesson,
            prevLesson: body.prevLesson
            }, config)

        .then((response) => {
            this.status = response.status
            this.response = response.data
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            console.log(err)
            this.response = {} as Lesson
        });

        return this.response
    }

    async getLessonById(id: string, token: string){
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let tmp_response: any
        try { 
            tmp_response =  await axios.get<any>(`http://24.199.72.217:8080/api/v1/auth/lessons/${id}`, config)
            this.status = tmp_response.status
            this.response = tmp_response.data
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            this.response = {} as Lesson
        }
        return this.response
    }

    async updateLesson(id: string, token: string, body: Lesson) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try { 
            await axios.patch(`http://24.199.72.217:8080/api/v1/auth/lessons/${id}`, {
                name: body.name,
                description: body.description,
                access: body.access,
                nodes: body.nodes,
                nextLesson: body.nextLesson,
                prevLesson: body.prevLesson
            }, config)
            .then((res) => {
                this.status = res.status
                this.response = res.data
            })
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            this.response = {} as Lesson
        }
        return this.response
    }

    async deleteLesson(id: string, token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await axios.delete(`http://24.199.72.217:8080/api/v1/auth/lessons/${id}`, config)
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

export default LessonService