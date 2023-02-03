import React, { useState } from 'react';
// import './admin_page.css'
import { UserGetHandle, UserUpdateHandle, UserDeleteHandle } from '../service_page/UserView';
import { ContainerProviderTendon } from 'linkWithBackend/services/container';
import { User } from "linkWithBackend/interfaces/TendonType";

type stateType = {
    id: string;
};

interface resultShowType {
    IsShow: boolean,
    ID: string,
    method: string,
    body: User
}

interface updateCase {
    isUpdate: boolean,
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

interface userInputpageType {
    method: string,
    shown: boolean
}

var updatedata = {} as User

function ShowResultField(props: resultShowType) {
    if (props.IsShow === true) {
        if (props.method === "GET") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <UserGetHandle user_id={props.ID} body={{} as User} ></UserGetHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "UPDATE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <UserUpdateHandle user_id={props.ID} body={props.body} ></UserUpdateHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "DELETE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <UserDeleteHandle user_id={props.ID} body={{} as User}></UserDeleteHandle>
                        </div>
                    </ContainerProviderTendon>
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

function InputForUpdate(UpdateCase: updateCase) {
    const state = UpdateCase.state
    const setState = UpdateCase.setState
    const onChangeFName = (e: React.FormEvent<HTMLInputElement>): void => {
        updatedata.firstName = e.currentTarget.value
        setState(false)
    };
    const onChangeLName = (e: React.FormEvent<HTMLInputElement>): void => {
        updatedata.lastName = e.currentTarget.value
        setState(false)
    };
    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        updatedata.email = e.currentTarget.value
        setState(false)
    };
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        updatedata.password = e.currentTarget.value
        setState(false)
    };
    if (UpdateCase.isUpdate === true) {
        return (
            <>
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
            </>
        )
    } else {
        return (
            <></>
        )
    }

}

export default function UserInputPage(props: userInputpageType) {
    const [state, setState] = useState<stateType>({ id: "" })
    const [showResult, setShowResult] = useState<boolean>(false)

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setState({ id: e.currentTarget.value });
        setShowResult(false)
    };

    const submitHandle = (): void => {
        setShowResult(true)
    }

    if (props.shown === false) {
        return (
            <>
            </>
        )
    } else {
        return (
            <>
                <div>
                    [ {props.method} method ]  Please Enter User ID:
                    <input type="text" value={state.id} onChange={onChange} />
                    <InputForUpdate isUpdate={props.method === "UPDATE"} state={showResult} setState={setShowResult} />
                    <button onClick={submitHandle}> Submit </button>
                    {/* <p> { state.text } </p> */}
                </div>
                <ShowResultField IsShow={showResult} ID={state.id} method={props.method} body={updatedata} />
            </>
        );
    }
}