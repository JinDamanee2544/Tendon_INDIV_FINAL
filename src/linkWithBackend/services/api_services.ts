import axios from "axios";
import { injectable } from "inversify";
import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
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

        await axios.post(url, {
                body
            }, config)

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

        return response
    }
}

export default APIService