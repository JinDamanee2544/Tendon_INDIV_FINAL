import axios from "axios";
import { injectable } from "inversify";
import { Course, Lesson, Node } from "linkWithBackend/interfaces/TendonType";
import { makeAutoObservable } from "mobx";

@injectable()
class APIService {
    status: number
    message: string

    constructor() {
        makeAutoObservable(this)
        this.status = 0
        this.message = ""
    }

    public async post<Type>(url: string, body: Type, token: string) {
        let response: Type = {} as Type
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios.post(url, body, config)

        .then((response) => {
            this.status = response.status
            response = response.data
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            console.log(err)
            response = {} as Type
        })

        return { 
            response: response, 
            status: this.status, 
            message: this.message 
        }
    }

    public async getByID<Type>(url: string, id: string, token: string) {
        let response: Type = {} as Type
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let tmp_response: any
        try { 
            tmp_response =  await axios.get<any>(url+"/"+id, config)
            this.status = tmp_response.status
            response = tmp_response.data
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            response = {} as Type
        }

        return response
    }

    public async update<Type>(url: string, body: Type, id: string, token: string) {
        let response: Type = {} as Type
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try { 
            await axios.patch(url+"/"+id, body, config)
            .then((res) => {
                this.status = res.status
                response = res.data
            })
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            response = {} as Type
        }

        return { 
            response: response, 
            status: this.status, 
            message: this.message 
        }
    }

    public async delete<Type>(url: string, id: string, token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await axios.delete(url+"/"+id, config)
            .then((res) => {
                this.status = res.status
            })
        } catch(err) {
            this.status = Object(err)["response"]["request"]["status"]
        }
        return this.status
    }
}

export default APIService