// import {useEffect, useState} from "react";
import { makeAutoObservable } from "mobx"

import { Container } from "inversify";
import TYPES, { User } from 'linkWithBackend/interfaces/TendonType'
import AuthService from "linkWithBackend/services/auth_service";

class SignDataViewModel {
    private AuthService: AuthService
    private user: User
    private status: Number
    private message: string

    constructor(container: Container) {
        makeAutoObservable(this)
        this.AuthService = container.get<AuthService>(TYPES.AuthService)
        this.user = {} as User
        this.status = 0
        this.message = ''
    }

    async signUp(body: User) {
        const tmpValue = await this.AuthService.signUp(body)
        this.status = this.AuthService.getStatus()
        if (this.status === 201) {
            this.user = tmpValue
            return this.user
        } else {
            this.handleErrorStatus()
        }
        return {} as User
    }

    async signIn(body: User) {
        const tmpValue = await this.AuthService.signIn(body)
        this.status = this.AuthService.getStatus()
        if (this.status === 200) {
            this.user = tmpValue
            return this.user
        } else {
            this.handleErrorStatus()
        }
        return {} as User
    }

    async signOut(token: string) {
        const tmpValue = await this.AuthService.signOut(token)
        this.status = this.AuthService.getStatus()
        if (this.status === 200) {
            this.status = tmpValue
        } else {
            this.handleErrorStatus()
        }
        return this.status
    }

    public getUser() {
        return this.user
    }

    public getStatus() {
        return this.status
    }

    public getMessage() {
        return this.message
    }

    private handleErrorStatus() {
        // if (this.status === 400) {
        //     this.message = "Error: " + this.AuthService.getMessage()
        // } else if (this.status === 401) {
        //     this.message = "Unauthorized"
        // } else if (this.status === 404) {
        //     this.message = "Doesn't have this ID"
        // } else if (this.status === 406) {
        //     this.message = "wrong email or password"
        // } else if (this.status === 409) {
        //     this.message = "email already exists"
        // } else {
        //     this.message = "Internal Error"
        // }
        this.message = "" + this.AuthService.getMessage()
    }

}

export default SignDataViewModel