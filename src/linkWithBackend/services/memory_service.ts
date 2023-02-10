import { localStorageInterface } from "linkWithBackend/interfaces/TendonType";
import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import 'reflect-metadata'
import { MemoryServiceInterface } from "linkWithBackend/interfaces/ServiceInterface";

@injectable()
class MemoryService implements MemoryServiceInterface {

    constructor() {
        makeAutoObservable(this)
    }

    setLocalStorage(data: localStorageInterface) {
        if (typeof window !== 'undefined' && data !== null && data !== undefined) {
            if (data.firstName !== undefined && data.lastName !== undefined) {
                localStorage.setItem('firstName', data.firstName)
                localStorage.setItem('lastName', data.lastName)
            }
            if (data.courseID !== undefined && data.courseName !== undefined) {
                localStorage.setItem('courseID', data.courseID)
                localStorage.setItem('courseName', data.courseName) 
            }
            if ( data.token !== undefined ) {
                localStorage.setItem('token', data.token)
            }
        }
    }

    getLocalStorage(item: string) {
        if (typeof window !== 'undefined') {
            switch (item) {
                case 'firstName':
                    return localStorage.getItem('firstName') || ""
                case 'lastName':
                    return localStorage.getItem('lastName') || ""
                case 'courseID':
                    return localStorage.getItem('courseID') || ""
                case 'courseName':
                    return localStorage.getItem('courseName') || ""
                case 'token':
                    return localStorage.getItem('token') || ""
                default:
                    return ""
            }
        }
        return ""
    }

}

export default MemoryService