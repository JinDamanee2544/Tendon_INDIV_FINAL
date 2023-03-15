import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import TYPES, { Node } from 'linkWithBackend/interfaces/TendonType'
import APIService from './api_service'
import { NodeServiceInterface } from 'linkWithBackend/interfaces/ServiceInterface'

@injectable()
class NodeService implements NodeServiceInterface {
    response: Node
    status: number
    apiService: APIService
    responseMany: Node[]

    constructor(
        @inject(TYPES.APIService) apiService: APIService
    ) {
        makeAutoObservable(this)
        this.response = {} as Node
        this.apiService = apiService
        this.status = 0
        this.responseMany = []
    }

    async postNode(body: Node) {
        let bodySend: Node = {
            ID: "",
            FileType: body.FileType,
            Data: body.Data,
            Title: "",
            Description: ""
        }
        const result = await this.apiService.post<Node>(
            "http://24.199.72.217:8080/api/v1/auth/nodes",
            bodySend,
        )
        this.status = result.status
        this.response = result.response.data
        return this.response
    }

    async getNodeById(id: string){
        let result = await this.apiService.get<Node>(`http://24.199.72.217:8080/api/v1/auth/nodes/${id}`)
        this.status = result.status
        return this.response = result.response.node!
    }

    async updateNode(id: string, body: Node) {
        let bodySend:Node = {
            ID: "",
            FileType: body.FileType,
            Data: body.Data,
            Title: "",
            Description: ""
        }

        const result = await this.apiService.update<Node>(
            "http://24.199.72.217:8080/api/v1/auth/nodes",
            bodySend,
            id,
        )
        this.status = result.status
        return this.response = result.response
    }

    async deleteNode(id: string) {
        this.status = await this.apiService.delete<Node>("http://24.199.72.217:8080/api/v1/auth/nodes", id)
        return this.status
    }

    async getManyNodeByID(courseID: string, lessonID: string, nodeIDs: string) {
        let result = await this.apiService.getManyByID<Node>("https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/node/node-id-many/" + courseID + "/" + lessonID + "/" + nodeIDs)
        this.status = result.status
        if (result.response == undefined) {
            return this.responseMany = []
        }
        return this.responseMany = result.response.nodes!     
    }

    public getStatus() {
        return this.status
    }

    public getResponse() {
        return this.response
    }

}

export default NodeService