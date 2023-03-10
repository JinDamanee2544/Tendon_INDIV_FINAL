import React, { useState } from "react";
import { Node } from "linkWithBackend/interfaces/TendonType";

import { NodeCreateHandle, NodeGetHandle, NodeUpdateHandle, NodeDeleteHandle } from '../service_page/NodeView';
import { ContainerProviderTendon } from 'linkWithBackend/services/container';

interface resultShowType {
    IsShow: boolean,
    method: string,
    body: Node,
}
interface showResultInterface {
    shownCreate: boolean,
    shownGet: boolean,
    shownUpdate: boolean,
    shownDelete: boolean
}

var node: Node = {} as Node

function ShowResultField(props: resultShowType) {
    if (props.IsShow === true) {
        if (props.method === "CREATE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <NodeCreateHandle body={props.body} ></NodeCreateHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "GET") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <NodeGetHandle body={props.body} ></NodeGetHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "UPDATE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <NodeUpdateHandle body={props.body}></NodeUpdateHandle>
                        </div>
                    </ContainerProviderTendon>
                </>
            )
        } else if (props.method === "DELETE") {
            return (
                <>
                    <ContainerProviderTendon>
                        <div>
                            <NodeDeleteHandle body={props.body}></NodeDeleteHandle>
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

function IDNodeComponent(props: componentType) {
    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        node = {
            ...node,
            ID: e.currentTarget.value
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

function FormNodeComponent(props: componentType) {
    const onChangeType = (e: React.FormEvent<HTMLInputElement>): void => {
        node = {
            ...node,
            FileType: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    const onChangeData = (e: React.FormEvent<HTMLInputElement>): void => {
        node = {
            ...node,
            Data: e.currentTarget.value
        }
        onChangeHandle(props)
    };
    return (
        <>
            <div className='form-field'>
                <div className='label-update'>Type: </div>
                <input type="text" onChange={onChangeType} />
            </div>
            <div className='form-field'>
                <div className='label-update'>Data: </div>
                <input type="text" onChange={onChangeData} />
            </div>
        </>
    )
}

interface propsInterface {
    method: string,
    shown: boolean
}

export default function NodePage(props: propsInterface) {
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
                    <p> CREATE NODE: </p>
                    < FormNodeComponent state={shown} setState={setShown} method={"CREATE"} />
                    <button onClick={() => { submitHandle("CREATE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownCreate} method="CREATE" body={node} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "GET") {
        return (
            <>
                <div>
                    <p> GET NODE: </p>
                    < IDNodeComponent state={shown} setState={setShown} method={"GET"} />
                    <button onClick={() => { submitHandle("GET") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownGet} method="GET" body={node} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "UPDATE") {
        return (
            <>
                <div>
                    <p> UPDATE NODE: </p>
                    < IDNodeComponent state={shown} setState={setShown} method={"UPDATE"} />
                    < FormNodeComponent state={shown} setState={setShown} method={"UPDATE"} />
                    <button onClick={() => { submitHandle("UPDATE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownUpdate} method="UPDATE" body={node} />
                    <hr></hr>
                </div>
            </>
        )
    } else if (props.method === "DELETE") {
        return (
            <>
                <div>
                    <p> DELETE NODE: </p>
                    < IDNodeComponent state={shown} setState={setShown} method={"DELETE"} />
                    <button onClick={() => { submitHandle("DELETE") }}> Submit </button>
                    < ShowResultField IsShow={shown.shownDelete} method="DELETE" body={node} />
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