import { User } from "linkWithBackend/interfaces/TendonType";
import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import 'reflect-metadata'

@injectable()
class MemoryService {
    token: string = ""
    firstName:string = ""
    lastName: string = ""
    courseID: string = ""
    courseName: string = ""

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

    public getCourseID() {
        if (typeof window !== 'undefined') {
            this.courseID = localStorage.getItem('courseID') || ""
            return this.courseID
        }
        return this.courseID
    }

    public getCourseName() {
        if (typeof window !== 'undefined') {
            this.courseName = localStorage.getItem('courseName') || ""
            return this.courseName
        }
        return this.courseName
    }

    public setCourse(courseID: string, courseName: string) {
        this.courseID = courseID
        this.courseName = courseName
        localStorage.setItem('courseID', courseID)
        localStorage.setItem('courseName', courseName)
    }
}

export default MemoryService