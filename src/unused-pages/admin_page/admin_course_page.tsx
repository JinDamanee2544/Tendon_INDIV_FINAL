import React, { useState } from "react";
import { Course } from "linkWithBackend/interfaces/TendonType";

import { CourseCreateHandle, CourseGetHandle, CourseUpdateHandle, CourseDeleteHandle } from "../service_page/CourseView";
import { ContainerProviderTendon } from 'linkWithBackend/services/container';

interface resultShowType {
    IsShow: boolean,
    method: string,
    body: Course,
}
interface showResultInterface {
    shownCreate: boolean,
    shownGet: boolean,
    shownUpdate: boolean,
    shownDelete: boolean
}

var COURSE: Course = {} as Course
COURSE = {
    ...COURSE,
    lessons: [],              // init array
}

function ShowResultField(props: resultShowType) {
    if (props.IsShow === true) {
        if (props.method === "CREATE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <CourseCreateHandle body={props.body} ></CourseCreateHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "GET") {
            return (
                <>
                    {/* <ContainerProviderTendon>
                        <div>
                            <CourseGetHandle body = {props.body} ></CourseGetHandle>
                        </div>
                    </ContainerProviderTendon> */}
                </>
            )
        } else if (props.method === "UPDATE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <CourseUpdateHandle body={props.body}></CourseUpdateHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "DELETE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <CourseDeleteHandle body={props.body}></CourseDeleteHandle>
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

interface componentType {
    state: showResultInterface,
    setState: React.Dispatch<React.SetStateAction<showResultInterface>>,
    method: string
}

function onChangeHandle(props: componentType) {
    const shown = props.state
    const setShown = props.setState
    const method = props.method
    if (method === "CREATE") {
        setShown({ shownCreate: false, shownGet: shown.shownGet, shownUpdate: shown.shownUpdate, shownDelete: shown.shownDelete })
    } else if (method === "GET") {
        setShown({ shownCreate: shown.shownCreate, shownGet: false, shownUpdate: shown.shownUpdate, shownDelete: shown.shownDelete })
    } else if (method === "UPDATE") {
        setShown({ shownCreate: shown.shownCreate, shownGet: shown.shownGet, shownUpdate: false, shownDelete: shown.shownDelete })
    } else if (method === "DELETE") {
        setShown({ shownCreate: shown.shownCreate, shownGet: shown.shownGet, shownUpdate: shown.shownUpdate, shownDelete: false })
    }
}

function IDCOURSEComponent(props: componentType) {
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        COURSE = {
            ...COURSE,
            id: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    return (
        <>
            <div className='form-field'>
                <div className='label-update'>ID: </div>
                <input type="text" onChange={onChange} />
            </div>
        </>
    )
}

interface componentArrayType {
    state: showResultInterface,
    setState: React.Dispatch<React.SetStateAction<showResultInterface>>,
    method: string,
}


function ArrayComponent(props: componentArrayType) {
    const [myArray, setMyArray] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0)
    var newProps = { state: props.state, setState: props.setState, method: props.method }
    const addElement = () => {
        setMyArray((t) => [...t, ""]);
        setCount(count + 1)
        onChangeHandle(newProps)
    }
    const deleteElement = async () => {
        myArray.pop()
        setCount(count - 1)           // make component re-render
        onChangeHandle(newProps)
    }
    const onChangeTextHandle = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        myArray[index] = e.currentTarget.value
        COURSE = {
            ...COURSE,
            lessons: myArray
        }
        onChangeHandle(newProps)
    }

    return (
        <>
            <div>
                {myArray.map((_, index) => {
                    return (
                        // <p key= {index} > {data} {index} </p>
                        <input key={index} type="text" onChange={(e) => { onChangeTextHandle(e, index) }} />
                    )
                })}
            </div>
            <button onClick={addElement} className="Add-button"> Add </button>
            <button onClick={deleteElement} className="Add-button"> Delete </button>
        </>
    )
}

function FormCourseComponent(props: componentType) {
    const onChangeName = (e: React.FormEvent<HTMLInputElement>): void => {
        COURSE = {
            ...COURSE,
            name: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    const onChangeDescription = (e: React.FormEvent<HTMLInputElement>): void => {
        COURSE = {
            ...COURSE,
            description: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    const selectAccess = (e: React.ChangeEvent<HTMLSelectElement>) => {
        COURSE = {
            ...COURSE,
            access: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    const onChangeCreateBy = (e: React.FormEvent<HTMLInputElement>): void => {
        COURSE = {
            ...COURSE,
            createBy: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    if (props.method === "UPDATE") {
        return (
            <>
                <div className='form-field'>
                    <div className='label-update'>Name: </div>
                    <input type="text" onChange={onChangeName} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Description: </div>
                    <input type="text" onChange={onChangeDescription} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Access: </div>
                    <select onChange={selectAccess} className="access-dropdown" id="access-dropdown-id" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Please select your COURSE access</option>
                        <option value="public">public</option>
                        <option value="inviteOnly">inviteOnly</option>
                        <option value="private">private</option>
                    </select>
                </div>
                <div className='form-field'>
                    <div className='label-update'>CreateBy: </div>
                    <input type="text" onChange={onChangeCreateBy} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Lessons: </div>
                    < ArrayComponent state={props.state} setState={props.setState} method={props.method} />
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='form-field'>
                    <div className='label-update'>Name: </div>
                    <input type="text" onChange={onChangeName} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Description: </div>
                    <input type="text" onChange={onChangeDescription} />
                </div>
                <div className='form-field'>
                    <div className='label-update'>Access: </div>
                    <select onChange={selectAccess} className="access-dropdown" id="access-dropdown-id" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Please select your course access</option>
                        <option value="public">public</option>
                        <option value="inviteOnly">inviteOnly</option>
                        <option value="private">private</option>
                    </select>
                </div>
                <div className='form-field'>
                    <div className='label-update'>Lessons: </div>
                    < ArrayComponent state={props.state} setState={props.setState} method={props.method} />
                </div>
            </>
        )
    }
}

interface propsInterface {
    method: string,
    shown: boolean
}

export default function CoursePage(props: propsInterface) {
    const [shown, setShown] = useState<showResultInterface>({ shownCreate: false, shownGet: false, shownUpdate: false, shownDelete: false })
    const submitHandle = (method: string): void => {
        if (method === "CREATE") {
            setShown({ shownCreate: true, shownGet: shown.shownGet, shownUpdate: shown.shownUpdate, shownDelete: shown.shownDelete })
        } else if (method === "GET") {
            setShown({ shownCreate: shown.shownCreate, shownGet: true, shownUpdate: shown.shownUpdate, shownDelete: shown.shownDelete })
        } else if (method === "UPDATE") {
            setShown({ shownCreate: shown.shownCreate, shownGet: shown.shownGet, shownUpdate: true, shownDelete: shown.shownDelete })
        } else if (method === "DELETE") {
            setShown({ shownCreate: shown.shownCreate, shownGet: shown.shownGet, shownUpdate: shown.shownUpdate, shownDelete: true })
        }
    }
    if (props.shown === false) {
        return (
            <></>
        )
    }
    if (props.method === "CREATE") {
        return (
            <>
                <div>
                    <p> CREATE COURSE: </p>
                    < FormCourseComponent state={shown} setState={setShown} method={"CREATE"} />
                    <button onClick={() => { submitHandle("CREATE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownCreate} method="CREATE" body={COURSE} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "GET") {
        return (
            <>
                <div>
                    <p> GET COURSE: </p>
                    < IDCOURSEComponent state={shown} setState={setShown} method={"GET"} />
                    <button onClick={() => { submitHandle("GET") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownGet} method="GET" body={COURSE} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "UPDATE") {
        return (
            <>
                <div>
                    <p> UPDATE COURSE: </p>
                    < IDCOURSEComponent state={shown} setState={setShown} method={"UPDATE"} />
                    < FormCourseComponent state={shown} setState={setShown} method={"UPDATE"} />
                    <button onClick={() => { submitHandle("UPDATE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownUpdate} method="UPDATE" body={COURSE} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "DELETE") {
        return (
            <>
                <div>
                    <p> DELETE COURSE: </p>
                    < IDCOURSEComponent state={shown} setState={setShown} method={"DELETE"} />
                    <button onClick={() => { submitHandle("DELETE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownDelete} method="DELETE" body={COURSE} />
                    <hr></hr>
                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}