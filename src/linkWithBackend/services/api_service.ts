import { inject, injectable } from "inversify";
import TYPES from "linkWithBackend/interfaces/TendonType";
import { makeAutoObservable, values } from "mobx";
import { APIServiceInterface, GetManyResponse, GetResponse, PostResponse } from "../interfaces/ServiceInterface";
import MemoryService from "./memory_service";
import { MemType } from "../interfaces/TendonType";
import apiClient from "util/apiClient";

// Create a new instance of axios 
// So that I can attach a interceptor to it
 
// const axiosClient = axios.create({
//     baseURL: "http://localhost:3000",
// }) 

@injectable()
class APIService implements APIServiceInterface {
    status: number
    message: string
    memService: MemoryService

    constructor(
        @inject(TYPES.MemoryService) memService: MemoryService,
    ) {
        makeAutoObservable(this)
        this.status = 0
        this.message = ""
        this.memService = memService
    }

    public async post<Type>(url: string, body: Type) {
        let result: PostResponse<Type> = {} as PostResponse<Type>
        let token = this.memService.getLocalStorage(MemType.token)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await apiClient.post(url, body, config)

        .then((response) => {
            result.status = response.status
            result.message = response.data.message
            result.response = response.data
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            console.log(err)
            result = {} as PostResponse<Type>
        })

        return result
    }

    public async get<Type>(url: string) {
        let result: GetResponse<Type> = {} as GetResponse<Type>
        let token = this.memService.getLocalStorage(MemType.token)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let tmp_response: any
        try { 
            tmp_response =  await apiClient.get<any>(url, config)
            this.status = tmp_response.status
            result = {
                status: this.status,
                response: tmp_response.data,
                message: tmp_response.data.message
            }
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            result = {} as GetResponse<Type>
        }
        return result
    } 

    public async getManyByID<Type>(url: string) {
        let result: GetManyResponse<Type> = {} as GetManyResponse<Type>
        let token = this.memService.getLocalStorage(MemType.token)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let tmp_response: any
        try { 
            tmp_response =  await apiClient.get<any>(url, config)
            this.status = tmp_response.status
            result = {
                status: this.status,
                response: tmp_response.data,
                message: tmp_response.data.message
            }
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            this.message = Object(err)["response"]["data"]["message"]
            result = {} as GetManyResponse<Type>
        }
        return result
    }

    public async update<Type>(url: string, body: Type, id: string) {
        let response: Type = {} as Type
        let token = this.memService.getLocalStorage(MemType.token)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try { 
            await apiClient.patch(url+"/"+id, body, config)
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

    public async delete<Type>(url: string, id: string) {
        let token = this.memService.getLocalStorage(MemType.token)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await apiClient.delete(url+"/"+id, config)
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