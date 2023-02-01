import { User } from "linkWithBackend/interfaces/TendonType";
import React from "react";
import { SignInHandle } from "unused-pages/service_page/SignView";

interface tmpLogIn {
    body: User,
    isCal: boolean
}

export default function SignInMiddleHandle(props: tmpLogIn) {
    if (props.isCal === false) {
        return (
            <></>
        )
    }
    return (
        < SignInHandle body={props.body} isCal={props.isCal} />
    )
}