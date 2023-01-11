import React from "react"
import { observer } from "mobx-react"
import { useState, useEffect } from "react";

import { useTendonContainer } from "linkWithBackend/services/container";
import NodeDataViewModel from "./NodeViewModel";
import { Node } from "linkWithBackend/interfaces/TendonType";
import { token } from "../_demo_setting";

interface propsInterface {
    body: Node
}

export const NodeCreateHandle = observer((props: propsInterface) => {
    const body = props.body
    const [nodeView, setNodeView] = useState<Node>({} as Node)
    const [message, setMessage] = useState<String>("")
    const [status, setStatus] = useState<Number>(0)   
    const viewModel = new NodeDataViewModel(useTendonContainer())

    new Promise(function(myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.createNode(body, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setNodeView(viewModel.getNode())
        setMessage(viewModel.getMessage())
        setStatus(viewModel.getStatus())
    })

    if (status === 201) {
        return (
            <div>
                <p> [ Node POST ] </p>
                <NodeView viewModel={ nodeView } />
            </div>              
        )
    } else {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p> NODE POST ERROR ZONE: </p>
                <p> { message } </p>
            </div>              
        )
    }
})

export const NodeGetHandle = observer((props: propsInterface) => {              
    const node_id = props.body.id
    const [nodeView, setNodeView] = useState<Node>({} as Node)  
    const [message, setMessage] = useState<String>("")
    const viewModel = new NodeDataViewModel(useTendonContainer())
    new Promise(function(myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.getNodeData(node_id, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setNodeView(viewModel.getNode())
        setMessage(viewModel.getMessage())
    })

    if (nodeView.id === undefined) {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p>  NODE GET ERROR ZONE: </p>
                <p> { message } </p>
            </div>              
        )
    }

    return (
        <div>
                <p> [ Node GET ] </p>
                <NodeView viewModel={ nodeView } />
        </div>              
    )
})

export const NodeUpdateHandle = observer((props: propsInterface) => {              
    const node_id = props.body.id
    const body = props.body
    const [nodeView, setNodeView] = useState<Node>({} as Node)  
    const [message, setMessage] = useState<String>("")
    const viewModel = new NodeDataViewModel(useTendonContainer())
    new Promise(function(myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.updateNodeData(node_id, token, body)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setNodeView(viewModel.getNode())
        setMessage(viewModel.getMessage())
    })

    if (nodeView.id === undefined) {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p> NODE UPDATE ERROR ZONE: </p>
                <p> { message } </p>
            </div>              
        )
    }

    return (
        <div>
            <p> [ Node UPDATE ] </p>
            <NodeView viewModel={nodeView}/>
        </div>              
    )
})

export const NodeDeleteHandle = observer((props: propsInterface) => { 
    const node_id = props.body.id
    const [deleteStatus, setDeleteStatus] = useState<Number>(0)  
    const [message, setMessage] = useState<String>("")
    const viewModel = new NodeDataViewModel(useTendonContainer())

    new Promise(function(myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.deleteNode(node_id, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setDeleteStatus(viewModel.getStatus())
        setMessage(viewModel.getMessage())
    })

    if (deleteStatus === 200) {
        return (
            <div>
                <p> [ Node DELETE ] </p>
                <p> Delete Complete </p>
            </div>              
        )
    } else {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p> NODE DELETE ERROR ZONE: </p>
                <p> { message } </p>
            </div>              
        )
    }
})

interface ShowDataViewProps {
    viewModel: Node
}

const NodeView = observer(( {viewModel}: ShowDataViewProps) => {
    return (
        <div>
                <div key= {viewModel.id}>
                    <p> **** {viewModel.id} **** </p>
                    <li> {viewModel.type} </li>
                    <li> {viewModel.data} </li>
                    <li> {viewModel.updateAt} </li>
                    <hr></hr>
                </div>
        </div>
    )
})