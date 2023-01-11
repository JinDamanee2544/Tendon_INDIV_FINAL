// import {useEffect, useState} from "react";
import { makeAutoObservable } from "mobx"

import { Container } from "inversify";
import TYPES, { Course } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_services";

class CourseDataViewModel{
    private CourseService: CourseService 
    private Course: Course
    private status: Number
    private message: string

    constructor(container: Container) {
        makeAutoObservable(this)
        this.CourseService = container.get<CourseService>(TYPES.CourseService)
        this.Course = {} as Course
        this.status = 0
        this.message = ''
    }
    
    async createCourse(body: Course, token: string) {
        const tmpValue =  await this.CourseService.postCourse(body, token)
        this.status = this.CourseService.getStatus()
        if (this.status === 201) {
            this.Course = tmpValue
            return this.Course
        } else {
            this.handleErrorStatus()
        }
        return {} as Course
    }

    async getCourseData(id: string, token: string) {
        const tmpValue =  await this.CourseService.getCourseById(id, token)
        this.status = this.CourseService.getStatus()
        if (this.status === 200) {
            this.Course = tmpValue
            return this.Course
        } else {
            this.handleErrorStatus()
        }
        return {} as Course
    }

    async updateCourseData(id: string, token: string, body: Course) {
        const tmpValue =  await this.CourseService.updateCourse(id, token, body)
        this.status = this.CourseService.getStatus()
        if (this.status === 200) {
            this.Course = tmpValue
            return this.Course
        } else {
            this.handleErrorStatus()
        }
        return {} as Course
    }

    async deleteCourse(id: string, token: string) {
        const status =  await this.CourseService.deleteCourse(id, token)
        this.status = status
        if (this.status === 200) {
            return this.status 
        } else {
            this.handleErrorStatus()
            return this.status
        }
    }

    public getCourse() {
        return this.Course
    }

    public getStatus() {
        return this.status
    }

    public getMessage() {
        return this.message
    }

    private handleErrorStatus() {
        if (this.status === 400) {
            this.message = "some field not exit --> " + this.CourseService.getMessage()
        } else if (this.status === 401) {
            this.message = "Unauthorized"
        } else if (this.status === 404) {
            this.message = "Doesn't have this ID"
        } else if (this.status === 406) {
            this.message = "406"
        } else if (this.status === 409) {
            this.message = "Token for Authorized Expired"
        } else {
            this.message = "Internal Error"
        }
    }

}

export default CourseDataViewModel