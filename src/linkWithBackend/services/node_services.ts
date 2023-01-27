import axios from 'axios'
import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import TYPES, { Lesson, Node } from 'linkWithBackend/interfaces/TendonType'
import APIService from './api_services'

@injectable()
class NodeService {
    response: Node
    status: number
    apiService: APIService

    constructor(
        @inject(TYPES.APIService) apiService: APIService
    ) {
        makeAutoObservable(this)
        this.response = {} as Node
        this.apiService = apiService
        this.status = 0
    }

    async postNode(body: Node, token: string) {
        let bodySend: Node = {
            id: "",
            type: body.type,
            data: body.data
        }
        const result = await this.apiService.post<Node>(
            "http://24.199.72.217:8080/api/v1/auth/nodes",
            bodySend,
            token
        )
        this.status = result.status
        return this.response = result.response
    }

    async getNodeById(id: string, token: string){
        return this.response = await this.apiService.getByID<Node>("http://24.199.72.217:8080/api/v1/auth/nodes", id, token)
    }

    async updateNode(id: string, token: string, body: Node) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try { 
            await axios.patch(`http://24.199.72.217:8080/api/v1/auth/nodes/${id}`, {
                type: body.type,
                data: body.data
            }, config)
            .then((res) => {
                this.status = res.status
                this.response = res.data
            })
        } catch (err) {
            this.status = Object(err)["response"]["request"]["status"]
            this.response = {} as Node
        }
        return this.response
    }

    async deleteNode(id: string, token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await axios.delete(`http://24.199.72.217:8080/api/v1/auth/nodes/${id}`, config)
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

}

export default NodeService