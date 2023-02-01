import { User } from "linkWithBackend/interfaces/TendonType";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ViewModel(){
    const router = useRouter();
    const signupMessage = router.query
    const [isCal, setisCal] = useState<boolean>(false)
    const [userProps, setUserProps] = useState<User>({} as User)

    const onChange = (e: any) => {
        setUserProps({
            ...userProps,
            [e.target.name]: e.target.value
        })
    }

    const submitHandle = (): void => {
        setisCal(true)
    }

    return {
        signupMessage,
        isCal,
        userProps,
        onChange,
        submitHandle
    }
}