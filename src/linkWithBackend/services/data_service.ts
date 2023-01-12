import axios from 'axios'
import { makeAutoObservable } from "mobx"
import { injectable } from 'inversify'
import { Lesson } from 'linkWithBackend/interfaces/TendonType'

@injectable()
class LessonGraphService {
    response: Lesson
    status: number
    message: string

    constructor() {
        makeAutoObservable(this)
        this.response = {} as Lesson
        this.status = 0
        this.message = ""
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

export default LessonGraphService