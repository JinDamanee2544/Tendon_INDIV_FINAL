import React, { useState } from 'react';
// import './admin_page.css'
import { SignUpHandle, SignInHandle } from '../service_page/SignView';
import { ContainerProviderTendon } from 'linkWithBackend/services/container';
import { User } from "linkWithBackend/interfaces/TendonType";

interface resultShowType {
    IsShow: boolean,
    ID: string,
    method: string,
    body: User
}

function SignComponent(props: resultShowType) {
    if (props.IsShow === true) {
        if (props.method === "SignUp") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <SignUpHandle body={props.body} ></SignUpHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "SignIn") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <SignInHandle body={props.body} ></SignInHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "SignOut") {
            return (
                <>
                    <div> In the Progress... </div>
                    {/* <ContainerProviderTendon>
                        <div>
                            <SignOutHandle user_id = { props.ID } body = { {} as User}></SignOutHandle>
                        </div>
                    </ContainerProviderTendon> */}
                </>
            )
        } else {
            return (
                <> </>
            )
        }
    } else {
        return (
            <></>
        )
    }
}

interface showComponent {
    isShown: boolean,
}

export function SignUpPage(shown: showComponent) {
    const [state, setState] = useState<User>({} as User)
    const [showResult, setShowResult] = useState<boolean>(false)
    const onChangeFName = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            firstName: e.currentTarget.value
        })
        setShowResult(false)
    };
    const onChangeLName = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            lastName: e.currentTarget.value
        })
        setShowResult(false)
    };
    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            email: e.currentTarget.value
        })
        setShowResult(false)
    };
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            password: e.currentTarget.value
        })
        setShowResult(false)
    };
    const submitHandle = (): void => {
        setShowResult(true)
    }

    if (shown.isShown === false) {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <div>
                <p> Sign Up </p>
                <div className='form-field'>
                    <div className='label-update'>Firstname: </div>
                    <input type="text" onChange={onChangeFName} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Lastname: </div>
                    <input type="text" onChange={onChangeLName} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Email: </div>
                    <input type="text" onChange={onChangeEmail} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Password: </div>
                    <input type="text" onChange={onChangePassword} />
                </div>
                <button onClick={submitHandle}> Submit </button>

                <SignComponent IsShow={showResult} ID={""} method={"SignUp"} body={state} />
            </div>

            <hr></hr>
        </>
    )
}

export function SignInPage(shown: showComponent) {
    const [state, setState] = useState<User>({} as User)
    const [showResult, setShowResult] = useState<boolean>(false)
    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            email: e.currentTarget.value
        })
        setShowResult(false)
    };
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            password: e.currentTarget.value
        })
        setShowResult(false)
    };

    const submitHandle = (): void => {
        setShowResult(true)
    }

    if (shown.isShown === false) {
        return (
            <></>
        )
    }

    return (
        <>
            <div>
                <p> Sign In </p>
                <div className='form-field'>
                    <div className='label-update'>Email: </div>
                    <input type="text" onChange={onChangeEmail} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Password: </div>
                    <input type="text" onChange={onChangePassword} />
                </div>

                <button onClick={submitHandle}> Submit </button>

                <SignComponent IsShow={showResult} ID={""} method={"SignIn"} body={state} />
            </div>
            <hr></hr>
        </>
    )
}

export function SignOutPage(shown: showComponent) {
    const [showResult, setShowResult] = useState<boolean>(true)
    if (shown.isShown === false) {
        return (
            <></>
        )
    }
    return (
        <>
            <div>
                <p> Sign Out </p>
                <SignComponent IsShow={showResult} ID={""} method={"SignOut"} body={{} as User} />
            </div>
            <hr></hr>
        </>
    )
}

interface showComponentModel {
    showSignUp: boolean,
    showSignIn: boolean,
    showSignOut: boolean,
}

export default function SignPage() {
    const [show, setShow] = useState<showComponentModel>({ showSignUp: false, showSignIn: false, showSignOut: false })
    function submitHandle(method: string) {
        if (method === "SignUp") {
            setShow({ showSignUp: !show.showSignUp, showSignIn: show.showSignIn, showSignOut: show.showSignOut })
        } else if (method === "SignIn") {
            setShow({ showSignUp: show.showSignUp, showSignIn: !show.showSignIn, showSignOut: show.showSignOut })
        } else {
            setShow({ showSignUp: show.showSignUp, showSignIn: show.showSignIn, showSignOut: !show.showSignOut })
        }
    }
    return (
        <>
            <div>
                <button onClick={() => submitHandle("SignUp")} className="button-shown"> Sign Up </button>
                <SignUpPage isShown={show.showSignUp} />
            </div>
            <div>
                <button onClick={() => submitHandle("SignIn")} className="button-shown"> Sign In </button>
                <SignInPage isShown={show.showSignIn} />
            </div>
            <div>
                <button onClick={() => submitHandle("SignOut")} className="button-shown"> Sign Out </button>
                <SignOutPage isShown={show.showSignOut} />
            </div>
        </>
    )
}