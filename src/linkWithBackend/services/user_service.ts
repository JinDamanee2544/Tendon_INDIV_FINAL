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


    async getUserByID(){
        let result = await this.apiService.get<User>(`https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/user`)
        this.status = result.status
        return {message: result.message, user:result.response.user! }
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
            accessToken: '',
            courses: [],
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