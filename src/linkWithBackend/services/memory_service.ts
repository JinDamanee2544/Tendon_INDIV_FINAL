import { localStorageInterface, MemType } from "linkWithBackend/interfaces/TendonType";
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
                localStorage.setItem(MemType.firstName, data.firstName)
                localStorage.setItem(MemType.lastName, data.lastName)
            }
            if (data.courseID !== undefined && data.courseName !== undefined) {
                localStorage.setItem(MemType.courseID, data.courseID)
                localStorage.setItem(MemType.courseName, data.courseName) 
            }
            if ( data.token !== undefined ) {
                localStorage.setItem(MemType.token, data.token)
            }
            if (data.courseIDs !== undefined) {
                localStorage.setItem(MemType.courseIDs,data.courseIDs.toString())
            }
            if (data.refreshToken !== undefined) {
                localStorage.setItem(MemType.refreshToken, data.refreshToken)
            }
        }
    }

    getLocalStorage(item: string) {
        if (typeof window !== 'undefined') {
            switch (item) {
                case MemType.firstName:
                    return localStorage.getItem(MemType.firstName) || ""
                case MemType.lastName:
                    return localStorage.getItem(MemType.lastName) || ""
                case MemType.courseID:
                    return localStorage.getItem(MemType.courseID) || ""
                case MemType.courseName:
                    return localStorage.getItem(MemType.courseName) || ""
                case MemType.token:
                    return localStorage.getItem(MemType.token) || ""
                case MemType.courseIDs:
                    return localStorage.getItem(MemType.courseIDs) || ""
                case MemType.refreshToken:
                    return localStorage.getItem(MemType.refreshToken) || ""
                default:
                    return ""
            }
        }
        return ""
    }

    removeLocalStorage() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(MemType.firstName)
            localStorage.removeItem(MemType.lastName)
            localStorage.removeItem(MemType.courseID)
            localStorage.removeItem(MemType.courseName)
            localStorage.removeItem(MemType.token)
            localStorage.removeItem(MemType.courseIDs)
            localStorage.removeItem(MemType.refreshToken)
        }
    }

}

export default MemoryService