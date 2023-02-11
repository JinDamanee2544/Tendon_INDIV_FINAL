import TYPES, { localStorageInterface, User } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_service";
import AuthService from "linkWithBackend/services/sign_service";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const authService = container.get<AuthService>(TYPES.AuthService)
const memService = container.get<MemoryService>(TYPES.MemoryService)

export default function ViewModel(){
    const router = useRouter();
    const [userProps, setUserProps] = useState<User>({} as User)
    const [message, setMessage] = useState<string[]>([])

    const onChange = (e: any) => {
        setUserProps({
            ...userProps,
            [e.target.name]: e.target.value
        })
    }

    const submitHandle = (e:FormEvent) => {
        console.log('submit')
        e.preventDefault()
        login()
    }

    const login = async() => {
        const user = await authService.signIn(userProps)
        const message = authService.getMessage()
        const status = authService.getStatus()

        setMessage(message)
        // setUserProps(user)
        
        let memStore = {} as localStorageInterface
        memStore.token = user.accessToken
        memStore.firstName = user.firstName
        memStore.lastName = user.lastName
        memService.setLocalStorage(memStore)

        if (status === 200) {
            router.push(`/${user.firstName+user.lastName}/dashboard`)
        } else {
            console.log(`Status : ${status} - Message : ${message}`)
        }
    }
    return {
        message,
        userProps,
        onChange,
        submitHandle
    }
}