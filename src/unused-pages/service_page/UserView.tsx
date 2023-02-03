import React from "react"
import { observer } from "mobx-react"
import { useState, useEffect } from "react";
import UserDataViewModel from './UserViewModel'

import { useTendonContainer } from "linkWithBackend/services/container";
import TYPES, { User } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_services";

interface UserProps {
    user_id: string,
    body: User
}

const memService = container.get<MemoryService>(TYPES.MemoryService)
var token = memService.getLocalStorage("tokenMEM")
export const UserGetHandle = observer((props: UserProps) => {
    const userID = props.user_id
    const [userGetView, setUserGetView] = useState<User>({} as User)
    const [message, setMessage] = useState<String>("")
    const viewModel = new UserDataViewModel(useTendonContainer())
    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.getUserInformation(userID, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setUserGetView(viewModel.getUser())
        setMessage(viewModel.getMessage())
    })

    if (userGetView.id === undefined) {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        } else {
            return (
                <div>
                    <p> GET ERROR ZONE: </p>
                    <p> {message} </p>
                </div>
            )
        }
    }

    return (
        <div>
            <p> [AUTH] Get Zone</p>
            <AuthView viewModel={userGetView} />
        </div>
    )
})

export const UserUpdateHandle = observer((props: UserProps) => {
    const userID = props.user_id
    const [userView, setUserView] = useState<User>({} as User)
    const [message, setMessage] = useState<String>("")
    var body = props.body
    const viewModel = new UserDataViewModel(useTendonContainer())
    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.updateUserInformation(userID, token, body)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setUserView(viewModel.getUser())
        setMessage(viewModel.getMessage())
    })

    if (userView.id === undefined) {
        if (message === "") {
            return (
                <>
                    <p> Loading... </p>
                </>
            )
        }
        return (
            <div>
                <p> UPDATE ERROR ZONE: </p>
                <p> {message} </p>
            </div>
        )
    }

    return (
        <div>
            <p> [AUTH] Update Zone </p>
            <AuthView viewModel={userView} />
        </div>
    )
})

export const UserDeleteHandle = observer((props: UserProps) => {
    const userID = props.user_id
    const [deleteStatus, setDeleteStatus] = useState<Number>(0)
    const [message, setMessage] = useState<String>("")
    const viewModel = new UserDataViewModel(useTendonContainer())

    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.deleteUserInformation(userID, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setDeleteStatus(viewModel.getStatus())
        setMessage(viewModel.getMessage())
    })

    if (deleteStatus === 200) {
        return (
            <div>
                <p> [AUTH] Delete Zone </p>
                <p> Delete Complete </p>
            </div>
        )
    } else {
        if (message === "") {
            return (
                <>
                    <p> Loading... </p>
                </>
            )
        } else {
            return (
                <div>
                    <p> DELETE ERROR ZONE: </p>
                    <p> {message} </p>
                </div>
            )
        }
    }
})


interface ShowDataViewProps {
    viewModel: User
}

const AuthView = observer(({ viewModel }: ShowDataViewProps) => {
    return (
        <div>
            <div key={viewModel.id}>
                <p>{viewModel.id} {'-->'} {viewModel.email}</p>
                <li> {viewModel.firstName} </li>
                <li> {viewModel.lastName} </li>
                <li> {viewModel.updateAt} </li>
                <hr></hr>
            </div>
        </div>
    )
})