import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import TYPES, { localStorageInterface, MemType, User } from 'linkWithBackend/interfaces/TendonType'
import jwt_decode from 'jwt-decode'
import { AuthServiceInterface } from 'linkWithBackend/interfaces/ServiceInterface'
import MemoryService from './memory_service'
import apiClient from 'util/apiClient'

type claimProps = {
    iss: string;
    sub: string;
    exp: number;
    nbf: number;
    iat: number;
    jti: string;
}
@injectable()
class AuthService implements AuthServiceInterface {
    response: User
    status: number
    message: string[]
    courseIDs: string[]
    memService: MemoryService

    constructor(
        @inject(TYPES.MemoryService) memService: MemoryService
    ) {
        makeAutoObservable(this)
        this.response = {} as User
        this.status = 0
        this.message = []
        this.courseIDs = []
        this.memService = memService
    }

    async signUp(body: User) {
        await apiClient.post('https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/auth/sign-up', {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
                role: body.role
            })
        .then((response) => {
            this.status = response.status
            this.response = response.data
            this.courseIDs = response.data.courseIDs
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
            try {
                this.message =  [Object(err)["response"]["data"]["error"]["signUpReq.Email"], 
                Object(err)["response"]["data"]["error"]["signUpReq.FirstName"],
                Object(err)["response"]["data"]["error"]["signUpReq.LastName"],
                Object(err)["response"]["data"]["error"]["signUpReq.Password"]]
            } catch(error) {
                this.message = [Object(err)["response"]["data"]["message"]]
            }
            this.response = {} as User
        });

        let memStore = {} as localStorageInterface
        memStore.token = this.response.accessToken
        memStore.courseIDs = []
        memStore.firstName = body.firstName
        memStore.lastName = body.lastName
        memStore.refreshToken = this.response.refreshToken
        this.memService.setLocalStorage(memStore)

        return this.response
    }

    async signIn(body: User) {
        await apiClient.post('https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/auth/sign-in', {
                email: body.email,
                password: body.password
            })
        .then((response) => {
            this.status = response.status
            this.response = response.data
            this.courseIDs = response.data.courses
        })
        .catch((err) => {
            console.log(err)
            this.status = Object(err)["response"]["request"]["status"]
            this.response = {} as User

            try {
                this.message = [Object(err)["response"]["data"]["error"]["signInReq.Email"], Object(err)["response"]["data"]["error"]["signInReq.Password"] ]
            } catch(error) {
                this.message = [Object(err)["response"]["data"]["message"]]
            }
        });

        let memStore = {} as localStorageInterface
        memStore.token = this.response.accessToken
        memStore.courseIDs = this.response.courses
        memStore.firstName = this.response.firstName
        memStore.lastName = this.response.lastName
        memStore.refreshToken = this.response.refreshToken
        this.memService.setLocalStorage(memStore)

        return this.response
    }

    async signOut() {              
        await apiClient.post('https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/auth/sign-out', {refreshToken: this.memService.getLocalStorage(MemType.refreshToken)})
        .then((response) => {
            this.status = response.status
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
        });
        this.memService.removeLocalStorage()
        return this.status
    }

    async renewAccessToken() {
        let accessToken = ""
        await apiClient.post('https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/auth/renew-access-token', {refreshToken: this.memService.getLocalStorage(MemType.refreshToken)})
        .then((response) => {
            this.status = response.status
            accessToken = response.data.accessToken
            this.message = response.data.message
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
            this.response = {} as User
        });

        let memStore = {} as localStorageInterface
        memStore.token = accessToken
        this.memService.setLocalStorage(memStore)

        return this.response
    }

    public isTokenValid():boolean{
        const token = this.memService.getLocalStorage(MemType.token)
        if (token === null) {
            return false
        }
        try {
            const claim : claimProps = jwt_decode(token)
            // console.log(claim)
            const currentTime = new Date().getTime() / 1000
            if (claim.exp < currentTime) {
                // console.log("Token is expired")
                return false
            }
            return true
        } catch (error) {
            // console.log("Token is Error")
            return false
        }
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

    public getCourseIDs() {
        return this.courseIDs
    }

}

export default AuthService