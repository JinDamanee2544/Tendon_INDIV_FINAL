import React, { useState } from "react";
import { Lesson } from "linkWithBackend/interfaces/TendonType";

import { LessonCreateHandle, LessonGetHandle, LessonUpdateHandle, LessonDeleteHandle } from '../service_page/LessonView';
import { ContainerProviderTendon } from 'linkWithBackend/services/container';

interface resultShowType {
    IsShow: boolean,
    method: string,
    body: Lesson,
}
interface showResultInterface {
    shownCreate: boolean,
    shownGet: boolean,
    shownUpdate: boolean,
    shownDelete: boolean
}

var LESSON: Lesson = {} as Lesson
LESSON = {
    ...LESSON,
    nodes: [],              // init array
    prevLesson: [],
    nextLesson: []
}

function ShowResultField(props: resultShowType) {
    if (props.IsShow === true) {
        if (props.method === "CREATE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <LessonCreateHandle body={props.body} ></LessonCreateHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "GET") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <LessonGetHandle body={props.body} ></LessonGetHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "UPDATE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <LessonUpdateHandle body={props.body}></LessonUpdateHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "DELETE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <LessonDeleteHandle body={props.body}></LessonDeleteHandle>
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

function IDLESSONComponent(props: componentType) {
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        LESSON = {
            ...LESSON,
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
    element: string
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
        if (props.element === "nodes") {
            LESSON = {
                ...LESSON,
                nodes: myArray
            }
        } else if (props.element === "prevL") {
            LESSON = {
                ...LESSON,
                prevLesson: myArray
            }
        } else if (props.element === "nextL") {
            LESSON = {
                ...LESSON,
                nextLesson: myArray
            }
        } else {

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

function FormLESSONComponent(props: componentType) {
    const onChangeName = (e: React.FormEvent<HTMLInputElement>): void => {
        LESSON = {
            ...LESSON,
            name: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    const onChangeDescription = (e: React.FormEvent<HTMLInputElement>): void => {
        LESSON = {
            ...LESSON,
            description: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    const selectAccess = (e: React.ChangeEvent<HTMLSelectElement>) => {
        LESSON = {
            ...LESSON,
            access: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    const onChangeCreateBy = (e: React.FormEvent<HTMLInputElement>): void => {
        LESSON = {
            ...LESSON,
            createBy: e.currentTarget.value
        }
        onChangeHandle(props)
    };

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
                    <option value="DEFAULT" disabled>Please select your lesson access</option>
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
                <div className='label-update'>Nodes: </div>
                < ArrayComponent state={props.state} setState={props.setState} method={props.method} element={"nodes"} />
            </div>
            <div className='form-field'>
                <div className='label-update'>NextLesson: </div>
                < ArrayComponent state={props.state} setState={props.setState} method={props.method} element={"nextL"} />
            </div>
            <div className='form-field'>
                <div className='label-update'>PrevLesson: </div>
                < ArrayComponent state={props.state} setState={props.setState} method={props.method} element={"prevL"} />
            </div>
        </>
    )
}

interface propsInterface {
    method: string,
    shown: boolean
}

export default function LessonPage(props: propsInterface) {
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
                    <p> CREATE LESSON: </p>
                    < FormLESSONComponent state={shown} setState={setShown} method={"CREATE"} />
                    <button onClick={() => { submitHandle("CREATE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownCreate} method="CREATE" body={LESSON} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "GET") {
        return (
            <>
                <div>
                    <p> GET LESSON: </p>
                    < IDLESSONComponent state={shown} setState={setShown} method={"GET"} />
                    <button onClick={() => { submitHandle("GET") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownGet} method="GET" body={LESSON} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "UPDATE") {
        return (
            <>
                <div>
                    <p> UPDATE LESSON: </p>
                    < IDLESSONComponent state={shown} setState={setShown} method={"UPDATE"} />
                    < FormLESSONComponent state={shown} setState={setShown} method={"UPDATE"} />
                    <button onClick={() => { submitHandle("UPDATE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownUpdate} method="UPDATE" body={LESSON} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "DELETE") {
        return (
            <>
                <div>
                    <p> DELETE LESSON: </p>
                    < IDLESSONComponent state={shown} setState={setShown} method={"DELETE"} />
                    <button onClick={() => { submitHandle("DELETE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownDelete} method="DELETE" body={LESSON} />
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