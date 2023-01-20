import { User } from "linkWithBackend/interfaces/TendonType";
import { ContainerProviderTendon } from "linkWithBackend/services/container";
import { SignInHandle } from "pages/adminControl/service_page/SignView";
import React from "react";

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
        < ContainerProviderTendon >
            < SignInHandle body={ props.body } isCal = {props.isCal} />
        </ContainerProviderTendon>
    )
}