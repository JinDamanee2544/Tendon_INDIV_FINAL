import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import TYPES, { Node } from 'linkWithBackend/interfaces/TendonType'
import APIService from './api_service'

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
        let result = await this.apiService.get<Node>(`http://24.199.72.217:8080/api/v1/auth/nodes/${id}`, token)
        this.status = result.status
        return this.response = result.response
    }

    async updateNode(id: string, token: string, body: Node) {
        let bodySend:Node = {
            id: "",
            type: body.type,
            data: body.data
        }

        const result = await this.apiService.update<Node>(
            "http://24.199.72.217:8080/api/v1/auth/nodes",
            bodySend,
            id,
            token
        )
        this.status = result.status
        return this.response = result.response
    }

    async deleteNode(id: string, token: string) {
        this.status = await this.apiService.delete<Node>("http://24.199.72.217:8080/api/v1/auth/nodes", id, token)
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