import 'reflect-metadata'
import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import TYPES, { User } from 'linkWithBackend/interfaces/TendonType'
import APIService from './api_service'
import { UserServiceInterface } from 'linkWithBackend/interfaces/ServiceInterface'

@injectable()
class UserService implements UserServiceInterface {
    response: User
    status: number
    apiService: APIService

    constructor(
        @inject(TYPES.APIService) apiService: APIService
    ) {
        makeAutoObservable(this)
        this.response = {} as User
        this.apiService = apiService
        this.status = 0
    }


    async getUserByID(id: string){
        let result = await this.apiService.get<User>(`http://24.199.72.217:8080/api/v1/auth/users${id}`)
        this.status = result.status
        return this.response = result.response
    }

    async updateUser(id: string, body: User) {
        let bodySend:User = {
            id: "",
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            type: '',
            role: '',
            createAt: '',
            updateAt: '',
            accessToken: ''
        }

        const result = await this.apiService.update<User>(
            "http://24.199.72.217:8080/api/v1/auth/nodes",
            bodySend,
            id,
        )
        this.status = result.status
        return this.response = result.response
    }

    async deleteUser(id: string) {
        this.status = await this.apiService.delete<User>("http://24.199.72.217:8080/api/v1/auth/users", id)
        return this.status
    }

    public getStatus() {
        return this.status
    }
}

export default UserService