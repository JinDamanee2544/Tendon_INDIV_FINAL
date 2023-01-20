import React from "react"
import { observer } from "mobx-react"
import { useState, useEffect } from "react";

import { useTendonContainer } from "linkWithBackend/services/container";
import SignDataViewModel from "./SignViewModel";
import { User } from "linkWithBackend/interfaces/TendonType";
import { useRouter } from 'next/router'
import DashBoard from "@components/Dashboard";
import { setToken, userInformation } from "../../../components/ShareData/user_setting";

export var user_id_new: string;         // For Testing purpose

interface signViewInterface {
    body: User,
    isCal?: boolean
}

export interface signViewRealInterface {
    body: User,
    isCal: boolean
}

export const SignUpHandle = observer((signView: signViewInterface) => {
    const body = signView.body
    const [userView, setUserView] = useState<User>({} as User)
    const [message, setMessage] = useState<String>("")
    const [status, setStatus] = useState<Number>(0)   
    const viewModel = new SignDataViewModel(useTendonContainer())

    new Promise(function(myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.signUp(body)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setUserView(viewModel.getUser())
        setMessage(viewModel.getMessage())
        setStatus(viewModel.getStatus())
    })
    if (signView.isCal === false) {
        return (
            <>
            </>
        )
    }
    
    if (status === 201) {
        return (
            <div>
                <p> [ Sign-Up ] </p>
                <DataView viewModel={ userView } />
            </div>              
        )
    } else {
        if (message === "") {
            return (
                <div>
                    <p> Loading... </p>
                </div>
            )
        }
        return (
            <div>
                <p> Sign-up ERROR ZONE: </p>
                <p> { message } </p>
            </div>              
        )
    }
})

export const SignInHandle = observer((signView: signViewRealInterface) => {
    const router = useRouter();
    const body = signView.body
    const [userView, setUserView] = useState<User>({} as User)
    const [message, setMessage] = useState<String>("")
    const [status, setStatus] = useState<Number>(0)
    const [accessToken, setAccessToken] = useState<string>("")   
    const viewModel = new SignDataViewModel(useTendonContainer())

    new Promise(function(myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.signIn(body)
            myResolve(tmpValue)
            setMessage("")
        }, [signView.isCal])
    }).then(() => {
        setUserView(viewModel.getUser())
        setMessage(viewModel.getMessage())
        setStatus(viewModel.getStatus())
        setToken(viewModel.getUser().accessToken)
        userInformation(viewModel.getUser())
    })

    if (signView.isCal === false) {
        return (
            <>
            </>
        )
    }
    if (status === 200) {
        // router.push('/?pid:123')
        router.push({
            pathname: '/',
            query: { 
                // email: "test@email.com",
                // firstName: "NewName",
                // id: "63b513ede68081422d62f401",
                // lastName: "NewLastName"
            },
        })
        return (
            <>
                {/* < DashBoard /> */}
                <p> [ Sign-In SUCCESSFULLY!!] </p>
                {/* <DataView viewModel={ userView } /> */}
            </>              
        )
    } else {
        if (message === "") {
            return (
                <div>
                    <p> Loading... </p>
                </div>
            )
        }
        return (
            <div>
                {/* <p> Sign-In ERROR ZONE: </p> */}
                <p> { message } </p>
            </div>              
        )
    }
})

export const SignOutHandle = observer(() => {

    const [message, setMessage] = useState<String>("")
    const [status, setStatus] = useState<Number>(0)   
    const viewModel = new SignDataViewModel(useTendonContainer())
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZW5kb25CYWNrZW5kIiwic3ViIjoiNjNhYjE1ZmNlNjgwODE0MjJkNjJlZDMwIiwiZXhwIjoxNjcyMjM1NDY5LCJuYmYiOjE2NzIyMjgyNjksImlhdCI6MTY3MjIyODI2OSwianRpIjoiNjNhYzJkYWRlNjgwODE0MjJkNjJlZTE5In0.vcZKFdx3vx3CWAwJdJrDXguDfaWtpW1f_nO2CkK1TvE"
    new Promise(function(myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.signOut(token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setMessage(viewModel.getMessage())
        setStatus(viewModel.getStatus())
    })

    if (status === 200) {
        return (
            <div>
                <p> [ Sign-Out ] </p>
                <p> Sign Out Completely!! </p>
            </div>              
        )
    } else {
        if (message === "") {
            return (
                <div>
                    <p> Loading... </p>
                </div>
            )
        }
        return (
            <div>
                <p> Sign-Out ERROR ZONE: (Does not Finish) </p>
                <p> { message } </p>
            </div>              
        )
    }
})

interface ShowDataViewProps {
    viewModel: User
}

const DataView = observer(( {viewModel}: ShowDataViewProps) => {
    user_id_new = viewModel.id
    return (
        <div>
                <div key= {viewModel.id}>
                    <p>{viewModel.id} { '-->' } {viewModel.email}</p>
                    <li> {viewModel.firstName} </li>
                    <li> {viewModel.lastName} </li>
                    <li> {viewModel.updateAt} </li>
                <hr></hr>
            </div>
        </div>
    )
})