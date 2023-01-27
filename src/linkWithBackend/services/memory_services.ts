import { User } from "linkWithBackend/interfaces/TendonType";
import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import 'reflect-metadata'

@injectable()
class MemoryService {
    token: string = ""
    firstName:string = ""
    lastName: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    public getToken() {
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('tokenMEM') || ""
            return this.token
        }
        return this.token
    }

    public setToken(tokenNew: string) {
        this.token = tokenNew
        localStorage.setItem('tokenMEM', tokenNew)
    }
    
    public getUserInitialState() {
        let fName = localStorage.getItem('firstName') || ""
        let lName = localStorage.getItem('lastName') || ""
        return {
            firstName: fName,
            lastName: lName
        }
    }
    
    public async SetuserInformation(user: User) {
        this.firstName = user.firstName
        this.lastName = user.lastName
        localStorage.setItem('firstName', user.firstName)
        localStorage.setItem('lastName', user.lastName)
    }
    
    public async userInformation(user: User) {
        await this.SetuserInformation(user)
    }
    
    public getUserCurrentData() {
        if (typeof window !== 'undefined') {
            return this.getUserInitialState()
        }
        return {
            firstName: this.firstName,
            lastName: this.lastName
        }
    }
}

export default MemoryService