import axios from 'axios'
import { makeAutoObservable } from "mobx"
import { injectable } from 'inversify'
import { User } from 'linkWithBackend/interfaces/TendonType'
import jwt_decode from 'jwt-decode'
import { AuthServiceInterface } from 'linkWithBackend/interfaces/ServiceInterface'

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

    constructor() {
        makeAutoObservable(this)
        this.response = {} as User
        this.status = 0
        this.message = []
    }

    async signUp(body: User) {
        await axios.post('https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/auth/sign-up', {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
                role: body.role
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
        await axios.post('https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/auth/sign-in', {
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

    public isTokenValid(token : string|null):boolean{
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

}

export default AuthService