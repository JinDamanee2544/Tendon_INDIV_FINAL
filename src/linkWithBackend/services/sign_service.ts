import axios from 'axios'
import { makeAutoObservable } from "mobx"
import { inject, injectable } from 'inversify'
import TYPES, { User } from 'linkWithBackend/interfaces/TendonType'
import jwt_decode from 'jwt-decode'

type claimProps = {
    iss: string;
    sub: string;
    exp: number;
    nbf: number;
    iat: number;
    jti: string;
}
@injectable()
class SignService {
    response: User
    status: number
    message: string[]

    constructor() {
        makeAutoObservable(this)
        this.response = {} as User
        this.status = 0
        this.message = []
    }

    async signUp(body: User) {
        await axios.post('http://24.199.72.217:8080/api/v1/user/sign-up', {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password
            })
        .then((response) => {
            this.status = response.status
            this.response = response.data
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

        return this.response
    }

    async signIn(body: User) {
        await axios.post('http://24.199.72.217:8080/api/v1/user/sign-in', {
                email: body.email,
                password: body.password
            })
        .then((response) => {
            this.status = response.status
            this.response = response.data
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
            this.response = {} as User

            try {
                this.message = [Object(err)["response"]["data"]["error"]["signInReq.Email"], Object(err)["response"]["data"]["error"]["signInReq.Password"] ]
            } catch(error) {
                this.message = [Object(err)["response"]["data"]["message"]]
            }
        });

        return this.response
    }

    async signOut(token: string) {                     // Unfinish
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios.post('http://24.199.72.217:8080/api/v1/user/sign-out', config)
        .then((response) => {
            this.status = response.status
        })
        .catch((err) => {
            this.status = Object(err)["response"]["request"]["status"]
        });

        return this.status
    }

    public isTokenValid(token : string){
        if (token == null) {
            return false
        }
        const claim : claimProps = jwt_decode(token)
        const currentTime = new Date().getTime() / 1000
        if (claim.exp < currentTime) {
            return false
        }
        return true
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

export default SignService