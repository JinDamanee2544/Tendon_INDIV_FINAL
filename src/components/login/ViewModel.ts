import { User } from "linkWithBackend/interfaces/TendonType";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ViewModel(){
    const router = useRouter();
    const signupMessage = router.query
    
    const [isCal, setisCal] = useState<boolean>(false)
    const [userProps, setUserProps] = useState<User>({} as User)

    
    const onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ...userProps,
            email: e.currentTarget.value,
        })
        setisCal(false)
    };
    const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        setUserProps({
            ...userProps,
            password: e.currentTarget.value
        })
        setisCal(false)
    };

    const submitHandle = (): void => {
        setisCal(true)
    }

    return {
        signupMessage,
        isCal,
        userProps,
        onChangeEmail,
        onChangePassword,
        submitHandle
    }
}