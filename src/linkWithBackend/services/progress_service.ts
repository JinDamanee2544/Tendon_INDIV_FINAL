import { id, inject, injectable } from "inversify";
import { ProgressServiceInterface } from "linkWithBackend/interfaces/ServiceInterface";
import TYPES, { ProgressBodyInterface, ProgressBodyResponseInterface } from "linkWithBackend/interfaces/TendonType";
import { makeAutoObservable } from "mobx";
import APIService from "./api_service";

@injectable()
class ProgressService implements ProgressServiceInterface {
    progress = 0;
    apiService: APIService;
    
    constructor(
        @inject(TYPES.APIService) apiService: APIService
    ) {
        makeAutoObservable(this)
        this.apiService = apiService
    }

    async postProgress(nodeID: string, lessonID: string, courseID: string) {
        let progressBody: ProgressBodyInterface = {
            nodeID: nodeID,
            courseID: courseID,
            lessonID: lessonID,
        };

        const res = await this.apiService.post<ProgressBodyInterface>("https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/node/progress", progressBody);

        if (res.status === 201) {
            return {
                progress: 100
            }
        }
        else {
            return {
                progress: 0
            }
        }

    }

    async getCoursesProgress(courseID: string) {
        let result = await this.apiService.get<ProgressBodyResponseInterface>(`https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/course/progress/${courseID}`)
        return {
            progress: result.response.progress?.progress!
        }
    }

    async getLessonsProgress(lessonID: string, courseID: string) {
        let result = await this.apiService.get<ProgressBodyResponseInterface>(`https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/lesson/progress/${lessonID}/${courseID}`)
        return {
            progress: result.response.progress?.progress!
        }
    }

    async getNodesProgress(nodeID: string, lessonID: string, courseID: string) {
        let result = await this.apiService.get<ProgressBodyResponseInterface>(`https://tendon-backend-cspqlbu5la-as.a.run.app/api/v2/node/progress/${nodeID}/${lessonID}/${courseID}`)
        return {
            progress: result.response.progress?.progress!
        }
    }

    public setProgress(progress: number): void { // lob due naja 
        this.progress = progress;
    }
}

export default ProgressService;